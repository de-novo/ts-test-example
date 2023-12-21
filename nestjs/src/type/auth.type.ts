import { Status } from '@prisma/client';
import { AuthService } from '@src/auth/auth.service';
import { FilteredNotErrorReturn } from '.';

export namespace Auth {
  export namespace RequestDTO {
    export interface Login {
      email: string;
      password: string;
    }
    export interface Signup {
      email: string;
      password: string;
    }
    export interface VerifyEmail {
      email: string;
      code: string;
    }
  }
  export namespace ResponseDTO {
    export interface Signup
      extends Omit<FilteredNotErrorReturn<AuthService['signup']>, 'password'> {
      /**
       * 유저 id
       * @type string
       * @title 유저 id
       */
      id: string;
      /**
       * 유저 email
       * @type string
       * @title 유저 email
       */
      email: string;
      /**
       * 이메일 인증 날짜
       * @type string
       * @title 이메일 인증 날짜
       */
      email_verified_at: Date | null;
      /**
       * 모바일 인증 날짜
       * @type string
       * @title 모바일 인증 날짜
       */
      mobile_verified_at: Date | null;

      /**
       * 생성 날짜
       * @type string
       * @title 생성 날짜
       */
      created_at: Date;

      /**
       * 업데이트 날짜
       * @type string
       * @title 업데이트 날짜
       */
      updated_at: Date;

      /**
       * 삭제 날짜
       * @type string
       * @title 삭제 날짜
       */
      deleted_at: Date | null;

      /**
       * 유저 상태
       * @type string
       * @title 유저 상태
       * @enum [ 'ACTIVE', 'INACTIVE', 'DELETED' ]
       * @default 'ACTIVE'
       */
      status: Status;
    }

    export type VerifyEmail = FilteredNotErrorReturn<
      AuthService['verifyEmail']
    >;

    export interface Login {
      /**
       * 로그인 성공 여부
       * @type boolean
       * @title 로그인 성공 여부
       * @default true
       */
      is_login: boolean;

      /**
       * access token
       * @type string
       * @title access token - jwt
       */
      access_token: string;
    }
  }
}
