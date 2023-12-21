import { HttpStatus } from '@nestjs/common';
import { ERROR } from '@src/type/index';

export namespace Error {
  export namespace Auth {
    export type MEMBER_NOT_EXIST = ERROR<
      'MEMBER_NOT_EXIST',
      HttpStatus.BAD_REQUEST
    >;
    export type EMAIL_ALREADY_EXIST = ERROR<
      'EMAIL_ALREADY_EXIST',
      HttpStatus.BAD_REQUEST
    >;
    export type EMAIL_NOT_EXIST = ERROR<
      'EMAIL_NOT_EXIST',
      HttpStatus.BAD_REQUEST
    >;
    export type EMAIL_ALREADY_VERIFIED = ERROR<
      'EMAIL_ALREADY_VERIFIED',
      HttpStatus.BAD_REQUEST
    >;
    export type EMAIL_NOT_VERIFIED = ERROR<
      'EMAIL_NOT_VERIFIED',
      HttpStatus.BAD_REQUEST
    >;

    export type INVALID_PASSWORD = ERROR<
      'INVALID_PASSWORD',
      HttpStatus.BAD_REQUEST
    >;
    export type INVALID_CODE = ERROR<'INVALID_CODE', HttpStatus.BAD_REQUEST>;

    export type VERIFICATION_CODE_ALREADY_VERIFIED = ERROR<
      'VERIFICATION_CODE_ALREADY_VERIFIED',
      HttpStatus.BAD_REQUEST
    >;
  }
}
