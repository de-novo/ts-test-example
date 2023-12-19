import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './common/mail/mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailer: MailService,
  ) {}

  /**
   * health-check
   *
   *
   * @author de-novo
   * @tag health-check
   * @summary health-check
   *
   * @return 200 - OK
   */
  @TypedRoute.Get('health-check')
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @TypedRoute.Post('test')
  test(): string {
    this.mailer.send({
      to: 'vo0v0000@naver.com',
      subject: 'test',
      text: 'test',
      html: '<h1>ㅁㄴㅇㄹㅁㅇㄹㄴㅁㅇㄹㄴㄹㅁㅇㄴ</h1>',
    });
    return 'OK';
  }
}
