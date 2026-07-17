import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { logger } from '../../logger/winston.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const res = context.switchToHttp().getResponse();

          logger.info({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            ip: req.ip,
            duration: `${Date.now() - start} ms`,
            body: req.body,
            params: req.params,
            query: req.query,
          });
        },
      }),
    );
  }
}