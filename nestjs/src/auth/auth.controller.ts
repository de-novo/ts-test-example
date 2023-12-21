import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from '@src//auth/auth.service';
import { createResponse, isError, throwError } from '@src/type';

import { Auth } from '@src/type/auth.type';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TypedRoute.Get('/')
  async getAuth() {
    return 'OK';
  }

  @TypedRoute.Post('/login')
  async login(
    @TypedBody() loginDTO: Auth.RequestDTO.Login,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDTO);
    if (isError(result)) {
      return throwError(result);
    }

    const { access_token, refresh_token } = result;
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return createResponse({
      is_login: true,
      access_token,
    });
  }

  @TypedRoute.Post('/logout')
  async logout() {
    return 'OK';
  }

  @TypedRoute.Post('/signup')
  async signup(@TypedBody() signupDTO: Auth.RequestDTO.Signup) {
    const result = await this.authService.signup(signupDTO);
    if (isError(result)) {
      return throwError(result);
    }
    return createResponse(result);
  }

  @TypedRoute.Patch('/password')
  async changePassword() {
    return 'OK';
  }

  @TypedRoute.Put('/password')
  async resetPassword() {
    return 'OK';
  }

  @TypedRoute.Post('/email/verification')
  async sendVerifyEmail() {
    return 'OK';
  }

  @TypedRoute.Patch('/email/verification')
  async verifyEmail(@TypedBody() verifyEmailDTO: Auth.RequestDTO.VerifyEmail) {
    const result = await this.authService.verifyEmail(verifyEmailDTO);
    if (isError(result)) {
      return throwError(result);
    }
    return createResponse(result);
  }

  @Get('/google/oauth2callback')
  async googleOauth2callback(@Query() code: { code: string }) {
    console.log(code, '/google/oauth2callback');
    return 'OK';
  }
}
