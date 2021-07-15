import { Controller, Get, HttpCode, Post, Query, Body } from '@nestjs/common';
import {
  ApiQuery,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { NoticeService } from './notice.service';
import { NoticeBody } from './dto/notice.dto';

export enum Mode {
  Dev = 'dev',
  Prod = 'prod',
}

export enum Name {
  Default = 'default',
}

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @ApiTags('Notice')
  @ApiOperation({
    summary: '发送消息',
    description: `
      Body 更多参数：https://developers.dingtalk.com/document/app/custom-robot-access/title-zob-eyu-qse
      测试环境下：
      1. Query mode 为 dev 使用测试机器人 （生产环境可忽略）
      2. Query name 为 default 使用默认机器人（生产环境可忽略）
      `,
  })
  @ApiQuery({ name: 'mode', required: true, enum: Mode })
  @ApiQuery({ name: 'name', required: true, enum: Name })
  @ApiBody({ type: NoticeBody })
  @ApiResponse({ status: 200, description: 'successfully' })
  async noticePushToDingTalk(
    @Query('mode') mode: Mode = Mode.Dev,
    @Query('name') name: Name = Name.Default,
    @Body() body: any,
  ) {
    return await this.noticeService.noticePushToDingTalk({ mode, name, body });
  }
}
