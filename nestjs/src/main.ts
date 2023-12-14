import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const port = process.env.PORT || 8000;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  const docs = await import('../../packages/api/swagger.json' as any);
  docs.servers = [
    { url: `http://localhost:${port}`, description: 'Local Server' },
  ];
  SwaggerModule.setup('docs', app, docs);
  await app.listen(port);
}
bootstrap();
