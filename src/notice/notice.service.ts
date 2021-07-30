import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nest-logs';

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
    try {
      const configDingTalkRobot = this.configService.get('DingTalkRobot');
      Logger.info('configDingTalkRobot:', configDingTalkRobot);

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

      Logger.info('token:', token);
      Logger.info('body:', body);

      const res = await this.httpService
        .post(`${url}?access_token=${token}`, body)
        .toPromise();

      // console.log('res', res);

      if (res.status === 200) {
        Logger.info('notice success');
        return {
          code: 0,
          message: 'success',
        };
      }
      throw new Error('status !== 200');
    } catch (e) {
      Logger.error('notice error', e.toString());

      return {
        code: -1,
        message: e.toString(),
      };
    }
  }
}
