import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { logger } from "src/logger/winston.logger";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const req = ctx.getRequest();

    logger.error({
      method: req.method,
      url: req.originalUrl,
      error: exception.message,
      stack: exception.stack,
    });

    throw exception;
  }
}