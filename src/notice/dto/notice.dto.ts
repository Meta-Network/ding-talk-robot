import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NoticeBody {
  @ApiProperty({
    required: true,
    description: 'notice type',
    example: 'text',
  })
  @IsNotEmpty()
  msgtype: string;

  @ApiProperty({
    required: true,
    description: 'notice content',
    example: {
      content: '警告：notice！',
    },
  })
  text: unknown;
}
