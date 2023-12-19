import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@src/common/prisma/prisma.service';
import { Auth } from '@src/type/auth.type';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthService } from './../../auth/auth.service';
import { commonHelper } from './common/helper';
describe('auth service', () => {
  let authService: AuthService;
  let mockPrisma: DeepMockProxy<PrismaClient>;

  // Arrange
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

  // teardown
  afterEach(() => {
    jest.clearAllMocks();
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

  describe('signup', () => {
    const mockData: Auth.RequestDTO.Signup = {
      email: 'test1234@test.test',
      password: 'test1234',
    };
    beforeEach(() => {
      mockPrisma.members.create.mockResolvedValue({
        ...mockData,
        password: '기존과다름',
        id: 'test1234',
        email_verified_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        mobile_verified_at: null,
        deleted_at: null,
        status: 'ACTIVE',
      });
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('SUCCESS: 새로운 유저 반환', async () => {
      // Arrange
      // Act
      const actual = await authService.signup(mockData);
      // Assert

      //유저 생성 함수가 호출되었는지 확인
      expect(mockPrisma.members.create).toHaveBeenCalledTimes(1);

      //기존 비밀번호와 다른지 확인
      expect(actual.password).not.toBe(mockData.password);

      // 새로운 유저를 반환하는지 확인
      expect(actual).toMatchObject({
        id: expect.any(String),
        email: mockData.email,
        password: expect.any(String),
      });
    });

    it('ERROR: 이미 존재하는 유저[중복된 이메일]', async () => {
      // Arrange
      mockPrisma.members.findUnique.mockResolvedValue({
        ...mockData,
        password: '기존과다름',
        id: 'test1234',
        email_verified_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        mobile_verified_at: null,
        deleted_at: null,
        status: 'ACTIVE',
      });

      // Act
      // Assert
      expect(async () => await authService.signup(mockData)).rejects.toThrow(
        '이미 가입된 이메일입니다.',
      );

      // 유저 조회 함수가 호출되었는지 확인 -> 유효성 검증
      expect(mockPrisma.members.findUnique).toHaveBeenCalledTimes(1);
      // 멤버 생성함수는 호출되면 안됨
      expect(mockPrisma.members.create).toHaveBeenCalledTimes(0);
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
