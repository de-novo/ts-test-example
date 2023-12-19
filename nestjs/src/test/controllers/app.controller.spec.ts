import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { MailService } from '@src/common/mail/mail.service';
import { commonHelper } from '../services/common/helper';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [...commonHelper.imports],
      controllers: [AppController],
      providers: [AppService, MailService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.healthCheck()).toBe('OK');
    });
  });
});
