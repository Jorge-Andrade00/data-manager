import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: Logger, private config: ConfigService) {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { status }: any =
      exception instanceof HttpException && exception.getResponse();

    const errorResponse = {
      code,
      status,
      message:
        code !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message.error ||
            exception.response.message ||
            exception.message
          : `Internal server error: ${exception.message}`,
    };

    this.logger.error(exception);

    response.status(code).json({ error: errorResponse });
  }
}
