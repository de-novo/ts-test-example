import { TypedBody, TypedException, TypedRoute } from '@nestia/core';
import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { AuthService } from '@src//auth/auth.service';
import { Error } from '@src/common/error';
import { SUCCESS, createResponse, isError, throwError } from '@src/type';

import { Auth } from '@src/type/auth.type';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TypedRoute.Get('/')
  async getAuth() {
    return 'OK';
  }

  /**
   * # Login - 로그인
   *
   * ## BODY
   * - email: string
   * - password: string
   *
   *
   * ## RESPONSE
   * ### success
   * - is_login: true
   * - access_token: string
   *
   * ### fail
   * - EMAIL_NOT_EXIST : 이메일이 존재하지 않음
   *   - 이메일이 존재하지 않는 경우, 회원가입을 유도하는 메시지를 띄워야 함
   * - INVALID_PASSWORD : 비밀번호가 틀림
   * - EMAIL_NOT_VERIFIED : 본인 인증이 되지 않음
   *    - 이메일 인증 및 휴대폰 인증을 거치지 않은 사용자는 로그인이 불가능함
   *    - 현재는 이메일 인증만 구현되어 있음
   * @author de-novo
   * @tag Auth
   * @summary Login API - 로그인
   * @description 로그인
   *
   *
   * @returns 201 - 로그인 성공
   *
   */
  @TypedRoute.Post('/login')
  @TypedException<Error.Auth.EMAIL_NOT_EXIST>(
    HttpStatus.BAD_REQUEST + 0.1, // 400.1
    'EMAIL_NOT_EXIST',
  )
  @TypedException<Error.Auth.INVALID_PASSWORD>(
    HttpStatus.BAD_REQUEST + 0.2, // 400.2
    'INVALID_PASSWORD',
  )
  @TypedException<Error.Auth.EMAIL_NOT_VERIFIED>(
    HttpStatus.BAD_REQUEST + 0.3, // 400.3
    'EMAIL_NOT_VERIFIED',
  )
  async login(
    @TypedBody() loginDTO: Auth.RequestDTO.Login,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SUCCESS<Auth.ResponseDTO.Login>> {
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
    console.log(access_token, 'access_token');
    return createResponse({
      is_login: true,
      access_token,
    });
  }

  @TypedRoute.Post('/logout')
  async logout() {
    return 'OK';
  }

  /**
   * # Signup - 회원가입
   * ## BODY
   * - email: string
   * - password: string
   *
   * ## RESPONSE
   * ### success
   * - 멤버 정보 - 스키마 참고
   *
   * ### fail
   * - EMAIL_ALREADY_EXIST : 이미 존재하는 이메일
   *
   * @tag Auth
   * @summary Signup API - 회원가입
   * @description 회원가입
   *
   * @returns 201 - 회원가입 성공
   */
  @TypedRoute.Post('/signup')
  @TypedException<Error.Auth.EMAIL_ALREADY_EXIST>(
    HttpStatus.BAD_REQUEST + 0.1, // 400.1
    'EMAIL_ALREADY_EXIST',
  )
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

  /**
   * # Verify Email - 이메일 인증
   *
   * ## BODY
   * - email: string
   * - code: string
   *
   * ## RESPONSE
   * ### success
   * - "SUCCESS"
   *
   * ### fail
   * - EMAIL_NOT_EXIST : 이메일이 존재하지 않음
   * - EMAIL_ALREADY_VERIFIED : 이미 인증된 이메일
   * - VERIFICATION_CODE_ALREADY_VERIFIED : 이미 인증된 코드
   * - INVALID_CODE : 인증 코드가 틀림
   *
   * @author de-novo
   * @tag Auth
   * @summary Verify Email API - 이메일 인증
   * @description 이메일 인증
   *
   * @returns 201 - 이메일 인증 성공
   */
  @TypedRoute.Patch('/email/verification')
  @TypedException<Error.Auth.EMAIL_NOT_EXIST>(
    HttpStatus.BAD_REQUEST + 0.1, // 400.1
    'EMAIL_NOT_EXIST',
  )
  @TypedException<Error.Auth.EMAIL_ALREADY_VERIFIED>(
    HttpStatus.BAD_REQUEST + 0.2, // 400.2
    'EMAIL_ALREADY_VERIFIED',
  )
  @TypedException<Error.Auth.VERIFICATION_CODE_ALREADY_VERIFIED>(
    HttpStatus.BAD_REQUEST + 0.3, // 400.3
    'VERIFICATION_CODE_ALREADY_VERIFIED',
  )
  @TypedException<Error.Auth.INVALID_CODE>(
    HttpStatus.BAD_REQUEST + 0.4, // 400.4
    'INVALID_CODE',
  )
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
