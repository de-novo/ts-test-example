import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@src/common/prisma/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthService } from './../../auth/auth.service';
import { commonHelper } from './common/helper';
describe('auth service', () => {
  let authService: AuthService;
  let mockPrisma: DeepMockProxy<PrismaClient>;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [...commonHelper.imports],
      providers: [AuthService, ConfigService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    authService = app.get<AuthService>(AuthService);
    mockPrisma = app.get(PrismaService);
  });

  describe('login', () => {
    it('should return "OK"', async () => {
      // Arrange
      const expected = 'OK';

      // Act
      const actual = await authService.login();
      // Assert
      expect(mockPrisma.users.findUnique).toHaveBeenCalledTimes(0);
      expect(actual).toBe(expected);
    });
  });

  describe('password hashed', () => {
    // Arrange
    const password = 'password';
    it('hashed password', async () => {
      // Act
      const actual = await authService.hashPassword(password);
      // Assert
      expect(actual).not.toBe(password);
    });
    it('verify password', async () => {
      // Act
      const actual = await authService.hashPassword(password);
      const verifyActual = await authService.verifyPassword(password, actual);
      // Assert
      expect(verifyActual).toBe(true);
    });
  });
});
