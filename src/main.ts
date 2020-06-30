import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger'
//引入
// import * as mongonse from 'mongoose'
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  //链接mongondb
  // mongonse.connect('mongodb://localhost/nest-blog-api',{
  //   useNewUrlParser:true,
  //   useFindAndModify:false,
  //   useCreateIndex:true
  // })
  const app = await NestFactory.create(AppModule);
  //配置swagger
  const options = new DocumentBuilder()
  .setTitle("Nest博客Api")
  .setDescription("我的第一nestjs项目")
  .setVersion("1.0")
  .build()
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup("docs",app,document);
  //开启全局验证
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
}
bootstrap();
