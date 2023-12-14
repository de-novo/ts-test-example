import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

@Controller({ version: '2', path: 'test' })
export class TestControllerV2 {
  @TypedRoute.Get()
  getHello(): string {
    return 'test v2';
  }
}
