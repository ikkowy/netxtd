import express, {Request, Response} from 'express';
import { tenantRouteMiddleware } from './middleware/tenantRouteMiddleware';
import { traceIdMiddleware } from './middleware/traceIdMiddleware';

const app = express();

app.use(traceIdMiddleware);

app.use(tenantRouteMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
