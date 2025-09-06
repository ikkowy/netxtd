import express, {Request, Response} from 'express';
import { tenantRouteMiddleware } from './middlewares/tenantRouteMiddleware';
import { traceIdMiddleware } from './middlewares/traceIdMiddleware';
import { LoggingService } from './services/LoggingService';
import { LogEntry } from './types/LogEntry';
import { LogLevel } from './types/LogLevel';

const app = express();

const loggingService = new LoggingService();

app.use(traceIdMiddleware);

app.use(tenantRouteMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  loggingService.log(() => new LogEntry(LogLevel.Info, 'Server is running on port 3000'));
});
