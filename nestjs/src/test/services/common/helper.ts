import { ConfigModule } from '@nestjs/config';
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
  ],
};
