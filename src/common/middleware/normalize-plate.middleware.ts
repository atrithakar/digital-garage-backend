import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class NormalizePlateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body && typeof req.body.plateNumber === 'string') {
      req.body.plateNumber = req.body.plateNumber.toUpperCase().trim();
    }
    next();
  }
}
