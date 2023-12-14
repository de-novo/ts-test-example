import { Module } from '@nestjs/common';
import { TestControllerV1 } from './controller/test-v1.controller';

@Module({
  imports: [],
  controllers: [TestControllerV1],
  providers: [],
})
export class V1Module {}
