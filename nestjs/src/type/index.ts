import { HttpException } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';

export type FilterdError<T> = T extends ERROR<infer S, infer H>
  ? ERROR<S, H>
  : never;

export type FilterdErrorReturn<T extends (...args: any) => any> = FilterdError<
  Awaited<ReturnType<T>>
>;

export interface ERROR<T, H extends ErrorHttpStatusCode> {
  is_success: false;
  message: T;
  status: H;
}

export interface SUCCESS<T> {
  is_success: true;
  message: string;
  result: T;
}

export const isError = (
  error: any,
): error is ERROR<string, ErrorHttpStatusCode> => {
  if (error?.is_success === false) {
    return true;
  }
  return false;
};

export const throwError = (err: ERROR<string, ErrorHttpStatusCode>) => {
  throw new HttpException(err, err.status);
};

export const createResponse = <T>(
  result: T,
  message: string = 'SUCCESS',
): SUCCESS<T> => ({
  is_success: true,
  message,
  result,
});
