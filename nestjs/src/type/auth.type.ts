import { members } from '@prisma/client';

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
    export interface Signup extends members {}
    export interface VerifyEmail {
      id: string;
      email: string;
    }
  }
}
