import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [NoticeService],
})
export class NoticeModule {}
