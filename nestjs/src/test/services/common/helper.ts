import { ConfigModule } from '@nestjs/config';
import { MailModule } from '@src/common/mail/mail.module';
import { PrismaModule } from '@src/common/prisma/prisma.module';
import config, { configValidationSchema } from '@src/config';

export const commonHelper = {
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
      validationSchema: configValidationSchema,
    }),
    PrismaModule,
    MailModule,
  ],
};
