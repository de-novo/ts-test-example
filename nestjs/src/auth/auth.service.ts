import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Error } from '@src/common/error';
import { MailService } from '@src/common/mail/mail.service';
import { signupMailTemplate } from '@src/common/mail/template/signup.template';
import { PrismaService } from '@src/common/prisma/prisma.service';
import { isError } from '@src/type';
import { Auth } from '@src/type/auth.type';
import * as bcrypt from 'bcrypt';
import typia from 'typia';
import { v4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async login() {
    return 'OK';
  }

  async signup(signupDTO: Auth.RequestDTO.Signup) {
    const { email, password } = signupDTO;

    const exist = await this.prisma.members.findUnique({
      where: {
        email,
      },
    });
    if (exist) {
      return typia.random<Error.Auth.EMAIL_ALREADY_EXIST>();
    }

    const hashedPassword = await this.hashPassword(password);
    const id = v4();
    const result = await this.prisma.members.create({
      data: {
        id,
        email,
        password: hashedPassword,
      },
    });

    this.sendEmailVerification(email);
    return result;
  }

  async sendEmailVerification(
    email: string,
    // _type: 'SINGUP' | 'RESET_PASSWORD',
  ) {
    const exist = await this.prisma.members.findUnique({
      where: {
        email,
      },
    });

    if (!exist) {
      return typia.random<Error.Auth.EMAIL_NOT_EXIST>();
    }
    const verifyNumber = this.randomDigit(6);
    const { id: member_id } = exist;
    const id = v4();
    const { code } = await this.prisma.verification_codes.create({
      data: {
        id,
        member_id,
        code: verifyNumber,
        target: 'EMAIL',
        // 5분 뒤에 만료
        expired_at: new Date(Date.now() + 1000 * 60 * 5),
      },
    });

    this.mailService.send({
      ...signupMailTemplate(email, code),
      text: '인증번호: ' + code,
      to: email,
    });
    return 'SUCCESS';
  }

  async verifyEmail(verifuEmailDTO: Auth.RequestDTO.VerifyEmail) {
    const { email, code } = verifuEmailDTO;
    const exist = await this.checkMemberExist(email);
    if (isError(exist)) {
      return exist;
    }
    if (exist.email_verified_at) {
      return typia.random<Error.Auth.EMAIL_ALREADY_VERIFIED>();
    }

    // 이미 인증된 코드가 있는지 확인
    const checkVerifiedCode = await this.checkAlreadyVerifiedCode(exist.id);
    if (isError(checkVerifiedCode)) {
      return checkVerifiedCode;
    }

    const now = new Date();
    const verificationCode = await this.prisma.verification_codes.findFirst({
      where: {
        code,
        member_id: exist.id,
        target: 'EMAIL',
        verified_at: null,
        expired_at: {
          gt: now,
        },
      },
    });
    if (!verificationCode) {
      return typia.random<Error.Auth.INVALID_CODE>();
    }

    // 인증코드 인증 처리
    await this.updateEmailVerifiedAt({
      member_id: exist.id,
      verification_code_id: verificationCode.id,
      time: now,
    });

    return 'SUCCESS';
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(await this.configService.get('hashSalt'));
    return await bcrypt.hash(password, salt);
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  randomDigit(num: number): string {
    /// 000000 ~ 999999 사이의 랜덤 숫자 생성
    const random = Math.floor(Math.random() * 1000000);
    const randomString = random.toString();
    const randomDigit = randomString.padStart(num, '0');
    return randomDigit;
  }

  async checkMemberExist(email: string) {
    const exist = await this.prisma.members.findUnique({
      where: {
        email,
      },
    });
    if (!exist) {
      return typia.random<Error.Auth.EMAIL_NOT_EXIST>();
    }
    return exist;
  }
  async checkAlreadyVerifiedCode(member_id: string) {
    const verificatied = await this.prisma.verification_codes.findMany({
      where: {
        member_id,
        target: 'EMAIL',
        verified_at: {
          not: null,
        },
      },
    });
    if (verificatied.length) {
      return typia.random<Error.Auth.VERIFICATION_CODE_ALREADY_VERIFIED>();
    }
    return false;
  }

  async updateEmailVerifiedAt({
    member_id,
    verification_code_id,
    time = new Date(),
  }: {
    member_id: string;
    verification_code_id: string;
    time?: Date;
  }) {
    const updateMember = this.prisma.members.update({
      where: {
        id: member_id,
      },
      data: {
        email_verified_at: time,
      },
    });
    const updateVerificationCode = this.prisma.verification_codes.update({
      where: {
        id: verification_code_id,
      },
      data: {
        verified_at: time,
      },
    });

    await this.prisma.$transaction([updateMember, updateVerificationCode]);
    return 'SUCCESS';
  }
}
