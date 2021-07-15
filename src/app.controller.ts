import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): {
    code: number;
    message: string;
    doc: string;
  } {
    return {
      code: 0,
      message: this.appService.getHello(),
      doc: '/openapi',
    };
  }
}
