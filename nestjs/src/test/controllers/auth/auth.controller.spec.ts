import { Test, TestingModule } from '@nestjs/testing';
import { members } from '@prisma/client';
import { AuthController } from '@src/auth/auth.controller';
import { AuthService } from '@src/auth/auth.service';
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
      describe('try signup', () => {
        it('should return "OK"', async () => {
          // Arrange
          const expected = typia.random<members>();
          authService.signup = jest.fn().mockResolvedValue(expected);
          const signupDTO = {
            email: 'test@test.test',
            password: 'test1234',
          };

          // Act
          const actual = await authController.signup(signupDTO);

          // Assert
          expect(actual).toBe(expected);
          expect(authService.signup).toHaveBeenCalledTimes(1);
          expect(authService.signup).toHaveBeenCalledWith(signupDTO);
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
  describe('/email/send-verify', () => {
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
  });
  describe('/email/verify', () => {
    describe(':PATCH) verify email', () => {
      describe('try verify email', () => {
        it('should return "OK"', async () => {
          // Arrange
          const expected = 'OK';

          // Act
          const actual = await authController.verifyEmail();

          // Assert
          expect(actual).toBe(expected);
        });
      });
    });
  });
});
