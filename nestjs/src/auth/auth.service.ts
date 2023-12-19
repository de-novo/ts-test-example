import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async login() {
    return 'OK';
  }
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(await this.configService.get('hashSalt'));
    return await bcrypt.hash(password, salt);
  }
  async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
