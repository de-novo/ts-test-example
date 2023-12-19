import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  const docs = await import('../../packages/api/swagger.json' as any);

  SwaggerModule.setup('docs', app, {
    ...docs,
    servers: [{ url: `http://localhost:${port}`, description: 'Local Server' }],
  });
  await app.listen(port);
}
bootstrap();
