import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@src/common/mail/mail.service';
import { PrismaService } from '@src/common/prisma/prisma.service';
import { Auth } from '@src/type/auth.type';
import * as bcrypt from 'bcrypt';
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
      throw new Error('이미 가입된 이메일입니다.');
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
      throw new Error('가입되지 않은 이메일입니다.');
    }

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
}
