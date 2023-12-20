import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from '@src//auth/auth.service';
import { Auth } from '@src/type/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async signup(@TypedBody() signupDTO: Auth.RequestDTO.Signup) {
    const result = await this.authService.signup(signupDTO);
    return result;
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
  @Get('/google/oauth2callback')
  async googleOauth2callback(@Query() code: { code: string }) {
    console.log(code, '/google/oauth2callback');
    return 'OK';
  }
}
