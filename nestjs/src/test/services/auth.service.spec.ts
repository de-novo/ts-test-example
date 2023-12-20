import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, members, verification_codes } from '@prisma/client';
import { AuthService } from '@src/auth/auth.service';
import { MailService } from '@src/common/mail/mail.service';
import * as template from '@src/common/mail/template/signup.template';
import { PrismaService } from '@src/common/prisma/prisma.service';
import { Auth } from '@src/type/auth.type';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import typia from 'typia';
import { commonHelper } from './common/helper';
describe('auth service', () => {
  let authService: AuthService;
  let mockPrisma: DeepMockProxy<PrismaClient>;
  let mockMailService: MailService;
  // Arrange
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [...commonHelper.imports],
      providers: [AuthService, ConfigService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .overrideProvider(MailService)
      .useValue(mockDeep<MailService>())
      .compile();

    authService = app.get<AuthService>(AuthService);
    mockPrisma = app.get(PrismaService);
    mockMailService = app.get(MailService);
    jest.mock('@src/common/mail/template/signup.template', () => ({
      signupMailTemplate: jest.fn().mockReturnValue({
        subject: 'test',
        text: 'test',
        html: '<h1>test</h1>',
      }),
    }));
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

      // 이메일 인증 함수가 호출되었는지만 확인하기위해
      authService.sendEmailVerification = jest
        .fn()
        .mockResolvedValue('SUCCESS');
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

      // 이메일 인증 함수 호출 확인
      expect(authService.sendEmailVerification).toHaveBeenCalledTimes(1);
      expect(authService.sendEmailVerification).toHaveBeenCalledWith(
        mockData.email,
      );
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
      // 이메일 인증 함수 호출 x
      expect(authService.sendEmailVerification).toHaveBeenCalledTimes(0);
    });
  });

  describe('sendEmailVerification', () => {
    const mockEmail = 'test123@test.test';

    beforeEach(() => {
      mockPrisma.members.findUnique.mockResolvedValue({
        ...typia.random<members>(),
        email: mockEmail,
      });
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('SUCCESS: 이메일 전송 성공', async () => {
      // Arrange
      authService.randomDigit = jest.fn().mockReturnValue('123456');
      jest.spyOn(template, 'signupMailTemplate').mockReturnValue({
        subject: 'test',
        html: '<h1>test</h1>',
      });
      mockPrisma.verification_codes.create.mockResolvedValue({
        ...typia.random<verification_codes>(),
        code: '123456',
        verified_at: null,
      });
      const sendWithExpect = {
        to: mockEmail,
        subject: 'test',
        text: expect.any(String),
        html: '<h1>test</h1>',
      };

      // Act
      const actual = await authService.sendEmailVerification(mockEmail);
      // Assert
      expect(actual).toBe('SUCCESS');
      expect(mockPrisma.members.findUnique).toHaveBeenCalledTimes(1);
      // 인증번호 생성이 한번만 호출되었는지 확인
      expect(authService.randomDigit).toHaveBeenCalledTimes(1);
      expect(template.signupMailTemplate).toHaveBeenCalledTimes(1);
      expect(template.signupMailTemplate).toHaveBeenCalledWith(
        mockEmail,
        '123456',
      );
      expect(mockPrisma.verification_codes.create).toHaveBeenCalledTimes(1);
      expect(mockMailService.send).toHaveBeenCalledTimes(1);
      expect(mockMailService.send).toHaveBeenCalledWith(sendWithExpect);
    });

    it('ERROR: 가입되지 않은 이메일', async () => {
      // Arrange
      jest.spyOn(template, 'signupMailTemplate').mockReturnValue({
        subject: 'test',
        html: '<h1>test</h1>',
      });
      mockPrisma.members.findUnique.mockResolvedValue(null);
      // Act
      // Assert
      expect(
        async () => await authService.sendEmailVerification(mockEmail),
      ).rejects.toThrow('가입되지 않은 이메일입니다.');

      expect(mockPrisma.members.findUnique).toHaveBeenCalledTimes(1);
      expect(mockMailService.send).toHaveBeenCalledTimes(0);
      expect(template.signupMailTemplate).toHaveBeenCalledTimes(0);
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

  it('random digit', () => {
    // Arrange
    const num = 6;
    // Act
    const actual = authService.randomDigit(6);
    // Assert
    expect(actual).toHaveLength(num);
    expect(actual).toMatch(/[0-9]{6}/);
  });
});
