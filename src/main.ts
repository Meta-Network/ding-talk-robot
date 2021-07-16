import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('NODE_ENV', process.env.NODE_ENV);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('DingTalkRobot')
    .setDescription(
      'DingTalk Robot, 当前机器人关键词 [ 提醒、警告、错误、成功 ]',
    )
    .setVersion('1.1')
    .addTag('dingTalk')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  await app.listen(7980);
}
bootstrap();
