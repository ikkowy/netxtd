import express, { Request, Response } from 'express';
import { traceIdMiddleware } from './middleware/traceIdMiddleware';
import { LoggingService } from './service/LoggingService';
import { LogEntry } from './type/LogEntry';
import { LogLevel } from './type/LogLevel';

import packageJson from '../package.json';

const app = express();

const loggingService = new LoggingService();

app.use(traceIdMiddleware);

const systemRouter = express.Router();

const tenantRouter = express.Router({ mergeParams: true });

app.use('/_', systemRouter);

app.use('/:tenant', tenantRouter);

systemRouter.get('/info', (req: Request, res: Response) => {
  res.json({
    application: packageJson.name,
    version: packageJson.version
  });
});

tenantRouter.get('/hello', (req: Request, res: Response) => {
  res.send('Hello from tenant: ' + req.params.tenant);
});

app.listen(3000, () => {
  loggingService.log(() => new LogEntry(LogLevel.Info, 'Server is running on port 3000'));
});
