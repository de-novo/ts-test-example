import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @TypedRoute.Get('/')
  async getAuth() {
    return 'OK';
  }

  @TypedRoute.Post('/login')
  async login() {
    return 'OK';
  }

  @TypedRoute.Post('/logout')
  async logout() {
    return 'OK';
  }

  @TypedRoute.Post('/signup')
  async signup() {
    return 'OK';
  }
  @TypedRoute.Patch('/password')
  async changePassword() {
    return 'OK';
  }

  @TypedRoute.Put('/password')
  async resetPassword() {
    return 'OK';
  }

  @TypedRoute.Post('/email/verify')
  async sendVerifyEmail() {
    return 'OK';
  }

  @TypedRoute.Post('/email/verify')
  async verifyEmail() {
    return 'OK';
  }
}
