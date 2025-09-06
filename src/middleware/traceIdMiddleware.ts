import { Request, Response, NextFunction } from 'express';
import { v4 as generateUuid } from 'uuid';

export function traceIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const traceId = generateUuid();
  console.log('Trace ID:', traceId);
  req.headers['x-trace-id'] = traceId;
  next();
}
