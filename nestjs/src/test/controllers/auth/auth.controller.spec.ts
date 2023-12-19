import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@src/auth/auth.controller';
// ----------------------------------------
// auth controller
// ----------------------------------------
describe('auth controller: default /auth', () => {
  let authController: AuthController;

  // Arrange
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    authController = app.get<AuthController>(AuthController);
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
          const expected = 'OK';

          // Act
          const actual = await authController.signup();

          // Assert
          expect(actual).toBe(expected);
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
