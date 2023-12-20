import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { members } from '@prisma/client';
import { AuthController } from '@src/auth/auth.controller';
import { AuthService } from '@src/auth/auth.service';
import { Error } from '@src/common/error';
import { FilterdErrorReturn, createResponse } from '@src/type';
import { Auth } from '@src/type/auth.type';
import { mockDeep } from 'jest-mock-extended';
import typia from 'typia';
// ----------------------------------------
// auth controller
// ----------------------------------------
describe('auth controller: default /auth', () => {
  let authController: AuthController;
  let authService: AuthService;
  // Arrange
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    })
      .overrideProvider(AuthService)
      .useValue(mockDeep<AuthService>())
      .compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  /**
   * ========================================
   * /auth
   * :GET
   * - should return "OK" // 변경 예정
   *
   *
   *
   * ========================================
   */
  describe('/', () => {
    describe(':GET', () => {
      it('should return "OK"', async () => {
        // Arrange
        const expected = 'OK';

        // Act
        const actual = await authController.getAuth();

        // Assert
        expect(actual).toBe(expected);
      });
    });
  });

  describe('/login', () => {
    describe(':POST', () => {
      describe('try login', () => {
        it('should return "OK"', async () => {
          // Arrange
          const expected = 'OK';

          // Act
          const actual = await authController.login();

          // Assert
          expect(actual).toBe(expected);
        });
      });
    });
  });
  describe('/logout', () => {
    describe(':POST', () => {
      describe('try logout', () => {
        it('should return "OK"', async () => {
          // Arrange
          const expected = 'OK';

          // Act
          const actual = await authController.logout();

          // Assert
          expect(actual).toBe(expected);
        });
      });
    });
  });
  describe('/signup', () => {
    describe(':POST', () => {
      describe('SUCCESS', () => {
        it('should return "OK"', async () => {
          // Arrange
          const mockMember = typia.random<members>();
          const expected = createResponse(mockMember);
          authService.signup = jest.fn().mockResolvedValue(mockMember);
          const signupDTO = {
            email: 'test@test.test',
            password: 'test1234',
          };

          // Act
          const actual = await authController.signup(signupDTO);

          // Assert;
          expect(actual).toStrictEqual(expected);
          expect(authService.signup).toHaveBeenCalledTimes(1);
          expect(authService.signup).toHaveBeenCalledWith(signupDTO);
        });
      });
      describe('ERROR', () => {
        const errCases: FilterdErrorReturn<typeof authService.signup>[] = [
          typia.random<Error.Auth.EMAIL_ALREADY_EXIST>(),
        ];

        test.each(errCases)('should return %p', async (err) => {
          // Arrange
          authService.signup = jest.fn().mockResolvedValue(err);
          const signupDTO = {
            email: 'test@test.test',
            password: 'test1234',
          };
          const expected = new HttpException(err, err.status);

          // Act
          const actual = authController.signup(signupDTO);

          // Assert
          expect(() => actual).rejects.toThrow(expected);
        });
      });
    });
  });

  describe('/password', () => {
    describe(':PUT) reset password', () => {
      describe('try reset password', () => {
        it('should return "OK"', async () => {
          // Arrange
          const expected = 'OK';

          // Act
          const actual = await authController.resetPassword();

          // Assert
          expect(actual).toBe(expected);
        });
      });
    });
    describe(':PATCH) change password', () => {
      describe('try change password', () => {
        it('should return "OK"', async () => {
          // Arrange
          const expected = 'OK';

          // Act
          const actual = await authController.changePassword();

          // Assert
          expect(actual).toBe(expected);
        });
      });
    });
  });
  describe('/email/verification', () => {
    describe(':POST) send verify email', () => {
      describe('try send verify email', () => {
        it('should return "OK"', async () => {
          // Arrange
          const expected = 'OK';

          // Act
          const actual = await authController.sendVerifyEmail();

          // Assert
          expect(actual).toBe(expected);
        });
      });
    });

    describe(':PATCH) verify email', () => {
      const mockVerifyEmailDTO = typia.random<Auth.RequestDTO.VerifyEmail>();

      describe('SUCCESS', () => {
        it('should return "SUCCESS"', async () => {
          // Arrange
          authService.verifyEmail = jest.fn().mockResolvedValue('SUCCESS');
          const expected = createResponse('SUCCESS');

          // Act
          const actual = await authController.verifyEmail(mockVerifyEmailDTO);

          // Assert
          expect(actual).toStrictEqual(expected);
        });
      });

      describe('ERROR', () => {
        const errCases: FilterdErrorReturn<typeof authService.verifyEmail>[] = [
          typia.random<Error.Auth.EMAIL_NOT_EXIST>(),
          typia.random<Error.Auth.EMAIL_ALREADY_VERIFIED>(),
          typia.random<Error.Auth.INVALID_CODE>(),
          typia.random<Error.Auth.VERIFICATION_CODE_ALREADY_VERIFIED>(),
        ];

        test.each(errCases)('should return %p', async (err) => {
          // Arrange
          authService.verifyEmail = jest.fn().mockResolvedValue(err);
          const expected = new HttpException(err, err.status);

          // Act
          const actual = authController.verifyEmail(mockVerifyEmailDTO);

          // Assert
          expect(() => actual).rejects.toThrow(expected);
        });
      });
    });
  });
});
