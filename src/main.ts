import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ResponseWrapperInterceptor } from './utils/interceptors/responseWrapper.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/filters/allException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<Logger>(Logger);

  app.setGlobalPrefix(config.get('APP_PREFIX'));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter(logger, config));
  app.useGlobalInterceptors(new ResponseWrapperInterceptor());

  await app.listen(config.get('PORT'), () => {
    logger.log(`service is running on: ${config.get('PORT')}`);
  });
}
bootstrap();
