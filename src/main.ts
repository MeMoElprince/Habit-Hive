import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));


  const config = new DocumentBuilder()
    .addBearerAuth(undefined, 'default')
    .setTitle('Habit Hive')
    .setDescription('The Habit Hive API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {

    swaggerOptions: {
      authAction: {
        default: {
          name: 'default',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmVhODE0OTI3ZWFiNzJhODY0ZjAxZWQiLCJlbWFpbCI6Im1lbW9AZ21haWwuY29tIiwiaWF0IjoxNzI2NzM3NzI5LCJleHAiOjE3MjY4MjQxMjl9.ZBoqkb4CvLqEOywDizX-iiq1hZYiupdni_IZki5twi8',
        },
      },
    },
  });


  await app.listen(8000);
}
bootstrap();
