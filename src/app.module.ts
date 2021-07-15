import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticeService } from './notice/notice.service';
import { NoticeController } from './notice/notice.controller';
import { NoticeModule } from './notice/notice.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import config from './config/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    HttpModule,
    NoticeModule,
  ],
  controllers: [AppController, NoticeController],
  providers: [AppService, NoticeService],
})
export class AppModule {}
