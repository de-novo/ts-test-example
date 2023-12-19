import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  async send({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text: string;
    html: string;
  }) {
    const transporter = await this.getTransporter();

    await transporter
      .sendMail({
        from: `"ho-it" <${this.configService.get<string>('MAIL_USER')}>`,
        to,
        subject,
        text,
        html,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        // 메세지 실패시 메세지큐 저장등의 처리
      });

    return 'SUCCESS';
  }

  private async getTransporter() {
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get('OAUTH_CLIENT_ID'),
      this.configService.get('OAUTH_CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );
    oauth2Client.setCredentials({
      refresh_token: this.configService.get('OAUTH_REFRESH_TOKEN'),
    });
    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token!);
      });
    });
    return nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('MAIL_USER'),
        clientId: this.configService.get('OAUTH_CLIENT_ID'),
        privateKey: this.configService.get('OAUTH_CLIENT_SECRET'),
        refreshToken: this.configService.get('OAUTH_REFRESH_TOKEN'),
        accessToken: accessToken as string,
      },
    });
  }
}
