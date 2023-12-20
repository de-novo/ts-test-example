import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './common/mail/mail.module';
import { MailService } from './common/mail/mail.service';
import { PrismaModule } from './common/prisma/prisma.module';
import config, { configValidationSchema } from './config';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [
    V1Module,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
      validationSchema: configValidationSchema,
    }),
    MailModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
