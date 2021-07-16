import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface HelloProps {
  code: number;
  message: string;
  doc: string;
  version: string;
  node_env: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): HelloProps {
    return {
      code: 0,
      message: this.appService.getHello(),
      doc: '/openapi',
      version: process.env.npm_package_version,
      node_env: process.env.NODE_ENV,
    };
  }
}
