import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
const PORT = process.env.PORT;

const port = 3000 | 3001;
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, () => console.log(`server listening on ${PORT}`));

  //const app1 = await NestFactory.create(AppModule);
  //await app.listen(3001, () => console.log('server listening on 3001'));
}
bootstrap();
///Users/ashishsharma/Downloads/assignment_backend/assignment
