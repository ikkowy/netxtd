import express, { Request, Response } from 'express';
import { traceIdMiddleware } from './middleware/traceIdMiddleware';
import { LoggingService } from './service/LoggingService';
import { LogEntry } from './types/LogEntry';
import { LogLevel } from './types/LogLevel';
import packageJson from '../package.json';
import { Pool } from 'pg';

const app = express();

const loggingService = new LoggingService();

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'netxtd',
  user: 'netxtd',
  password: 'netxtd'
});

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

systemRouter.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ database: 'connected', databaseTime: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database unavailable' });
  }
});

tenantRouter.get('/hello', (req: Request, res: Response) => {
  res.send('Hello from tenant: ' + req.params.tenant);
});

app.listen(3000, () => {
  loggingService.log(() => new LogEntry(LogLevel.Info, 'Server is running on port 3000'));
});
