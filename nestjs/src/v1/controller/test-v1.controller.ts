import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

@Controller({ version: '1', path: 'test' })
export class TestControllerV1 {
  @TypedRoute.Get()
  getHello(): string {
    return 'test v1';
  }
}
