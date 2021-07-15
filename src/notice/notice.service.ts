import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NoticeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async noticePushToDingTalk({
    mode = 'prod',
    name = 'default',
    body,
  }): Promise<any> {
    const { msgtype } = body;
    if (!msgtype) {
      return {
        code: -1,
        message: 'no msgtype',
      };
    }

    try {
      const configDingTalkRobot = this.configService.get('DingTalkRobot');

      const url =
        mode === 'dev'
          ? configDingTalkRobot.dev[name].url
          : configDingTalkRobot.prod[name].url;
      const token =
        mode === 'dev'
          ? configDingTalkRobot.dev[name].token
          : configDingTalkRobot.prod[name].token;

      if (!url || !token) {
        throw new Error('not url or token');
      }

      const res = await this.httpService
        .post(`${url}?access_token=${token}`, body)
        .toPromise();

      // console.log('res', res);

      if (res.status === 200) {
        return {
          code: 0,
          message: 'success',
        };
      }
      throw new Error('status !== 200');
    } catch (e) {
      return {
        code: -1,
        message: e.toString(),
      };
    }
  }
}
