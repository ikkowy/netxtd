import express, {Request, Response} from 'express';
import { traceIdMiddleware } from './middlewares/traceIdMiddleware';
import { LoggingService } from './services/LoggingService';
import { LogEntry } from './types/LogEntry';
import { LogLevel } from './types/LogLevel';

const packageJson = require('../package.json');

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
