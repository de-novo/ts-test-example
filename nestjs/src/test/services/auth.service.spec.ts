import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, members, verification_codes } from '@prisma/client';
import { AuthService } from '@src/auth/auth.service';
import { Error } from '@src/common/error';
import { MailService } from '@src/common/mail/mail.service';
import * as template from '@src/common/mail/template/signup.template';
import { PrismaService } from '@src/common/prisma/prisma.service';
import { isError } from '@src/type';
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
      providers: [AuthService, ConfigService, PrismaService, JwtService],
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
    const mockData: Auth.RequestDTO.Login = {
      email: 'test@test.test',
      password: 'test1234',
    };
    it('SUCCESS', async () => {
      // Arrange
      authService.jwtSign = jest.fn().mockReturnValue('test');
      authService.verifyPassword = jest.fn().mockResolvedValue(true);
      mockPrisma.members.findUnique.mockResolvedValue({
        ...typia.random<members>(),
        email: mockData.email,
        password: 'test1234',
        email_verified_at: new Date(),
      });
      const expected = {
        access_token: 'test',
        refresh_token: 'test',
      };

      // Act
      const actual = await authService.login(mockData);
      // Assert
      expect(actual).toStrictEqual(expected);
    });
    it('ERROR: 존재하지 않는 유저', async () => {
      // Arrange
      mockPrisma.members.findUnique.mockResolvedValue(null);
      const expected = typia.random<Error.Auth.EMAIL_NOT_EXIST>();

      // Act
      const actual = await authService.login(mockData);
      // Assert
      expect(actual).toStrictEqual(expected);
    });
    it('ERROR: 비밀번호가 일치하지 않는 경우', async () => {
      // Arrange
      authService.verifyPassword = jest.fn().mockResolvedValue(false);
      mockPrisma.members.findUnique.mockResolvedValue({
        ...typia.random<members>(),
        email: mockData.email,
        password: 'test1234',
      });
      const expected = typia.random<Error.Auth.INVALID_PASSWORD>();

      // Act
      const actual = await authService.login(mockData);
      // Assert
      expect(actual).toStrictEqual(expected);
    });
    it('ERROR: 이메일 인증이 되지 않은 경우', async () => {
      // Arrange
      authService.verifyPassword = jest.fn().mockResolvedValue(true);
      mockPrisma.members.findUnique.mockResolvedValue({
        ...typia.random<members>(),
        email: mockData.email,
        password: 'test1234',
        email_verified_at: null,
      });
      const expected = typia.random<Error.Auth.EMAIL_NOT_VERIFIED>();

      // Act
      const actual = await authService.login(mockData);
      // Assert
      expect(actual).toStrictEqual(expected);
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

    it('SUCCESS: 새로운 유저 반환', async () => {
      // Arrange
      // Act
      const actual = await authService.signup(mockData);
      // Assert
      if (isError(actual)) {
        return; // 에러가 발생하면 테스트 실패
      }
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
      const actual = await authService.signup(mockData);
      // Assert
      expect(actual).toStrictEqual(
        typia.random<Error.Auth.EMAIL_ALREADY_EXIST>(),
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
      const actual = await authService.sendEmailVerification(mockEmail);
      // Assert
      expect(actual).toStrictEqual(typia.random<Error.Auth.EMAIL_NOT_EXIST>());
      expect(mockPrisma.members.findUnique).toHaveBeenCalledTimes(1);
      expect(mockMailService.send).toHaveBeenCalledTimes(0);
      expect(template.signupMailTemplate).toHaveBeenCalledTimes(0);
    });
  });

  describe('verifyEmail', () => {
    const mockData: Auth.RequestDTO.VerifyEmail = {
      email: 'test@test.test',
      code: '123456',
    };
    const mockMember = { ...typia.random<members>(), email: mockData.email };

    it('SUCCESS: 이메일 인증 성공', async () => {
      /**
       * 이메일 인증성공 절차
       * 1. 멤버 조회
       *    - 멤버가 존재하지 않으면 에러
       * 3. 인증코드 조회
       *    - 인증코드가 존재하지 않으면 에러
       *    - 인증코드가 만료되었으면 에러
       *    - 인증코드가 이미 인증되었으면 에러
       *
       * 4. 인증코드 인증 처리
       * 5. 멤버 이메일 인증 처리
       */
      // Arrange
      mockPrisma.verification_codes.findFirst.mockResolvedValue({
        ...typia.random<verification_codes>(),
        code: mockData.code,
        verified_at: null,
      });
      jest
        .spyOn(authService, 'updateEmailVerifiedAt')
        .mockResolvedValue('SUCCESS');
      jest.spyOn(authService, 'checkMemberExist').mockResolvedValue({
        ...mockMember,
        email_verified_at: null,
      });
      jest
        .spyOn(authService, 'checkAlreadyVerifiedCode')
        .mockResolvedValue(false);
      jest
        .spyOn(authService, 'updateEmailVerifiedAt')
        .mockResolvedValue('SUCCESS');

      const expected = 'SUCCESS';

      // Act
      const actual = await authService.verifyEmail(mockData);

      // Assert
      expect(actual).toBe(expected);
      expect(authService.checkMemberExist).toHaveBeenCalledTimes(1);
      expect(authService.checkAlreadyVerifiedCode).toHaveBeenCalledTimes(1);
      expect(mockPrisma.verification_codes.findFirst).toHaveBeenCalledTimes(1);
      expect(authService.updateEmailVerifiedAt).toHaveBeenCalledTimes(1);
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

  describe('validation', () => {
    // 검증관련 테스트
    describe('checkMemberAlreadyExist', () => {
      const mockEmali = 'test@test.test';
      const mockMember = typia.random<members>();

      it('SUCCESS: 이메일이 존재할때', async () => {
        // Arrange
        mockPrisma.members.findUnique.mockResolvedValue({
          ...mockMember,
          email: mockEmali,
        });
        const expected = { ...mockMember, email: mockEmali };
        // Act
        const actual = await authService.checkMemberExist(mockEmali);
        // Assert
        expect(actual).toStrictEqual(expected);
      });

      it('ERROR: 이메일이 존재하지 않을때', async () => {
        // Arrange
        mockPrisma.members.findUnique.mockResolvedValue(null);
        const expected = typia.random<Error.Auth.EMAIL_NOT_EXIST>();
        // Act
        const actual = await authService.checkMemberExist(mockEmali);
        // Assert
        expect(actual).toStrictEqual(expected);
      });
    });

    describe('checkAlreadyVerifiedCode', () => {
      const mockMemberId = 'test1234';
      const mockVerificationCode = typia.random<verification_codes>();

      it('SUCCESS: 인증된 코드가 없을경우', async () => {
        // Arrange
        mockPrisma.verification_codes.findMany.mockResolvedValue([]);
        // Act
        const actual = await authService.checkAlreadyVerifiedCode(mockMemberId);
        // Assert
        expect(actual).toBe(false);
      });
      it('ERROR: 인증된 코드가 이미 존재하는 경우', async () => {
        // Arrange
        mockPrisma.verification_codes.findMany.mockResolvedValue([
          {
            ...mockVerificationCode,
            verified_at: new Date(),
          },
        ]);
        // Act
        const actual = await authService.checkAlreadyVerifiedCode(mockMemberId);
        // Assert
        expect(actual).toStrictEqual(
          typia.random<Error.Auth.VERIFICATION_CODE_ALREADY_VERIFIED>(),
        );
      });
    });
  });

  describe('updateEmailVerifiedAt', () => {
    it('SUCCESS: 이메일 인증 처리', async () => {
      // Arrange
      const mockData = {
        member_id: 'test1234',
        verification_code_id: 'test1234',
      };
      const mockMember = typia.random<members>();
      const mockVerificationCode = typia.random<verification_codes>();
      mockPrisma.members.update.mockResolvedValue({
        ...mockMember,
        email_verified_at: new Date(),
      });
      mockPrisma.verification_codes.update.mockResolvedValue({
        ...mockVerificationCode,
        verified_at: new Date(),
      });
      const expected = 'SUCCESS';
      // Act
      const actual = await authService.updateEmailVerifiedAt(mockData);
      // Assert
      expect(actual).toBe(expected);
      expect(mockPrisma.members.update).toHaveBeenCalledTimes(1);
      expect(mockPrisma.verification_codes.update).toHaveBeenCalledTimes(1);
    });
  });
});
