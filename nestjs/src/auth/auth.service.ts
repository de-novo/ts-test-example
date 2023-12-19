import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@src/common/prisma/prisma.service';
import { Auth } from '@src/type/auth.type';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
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
    return result;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(await this.configService.get('hashSalt'));
    return await bcrypt.hash(password, salt);
  }
  async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
