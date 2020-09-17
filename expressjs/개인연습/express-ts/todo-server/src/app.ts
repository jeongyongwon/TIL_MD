import * as express from 'express';
import * as cors from 'cors'; //5.2K (gzipped: 2.1K)
import * as bodyparser from 'body-parser'; // Calculationg..

import { requestLoggerMiddleware } from './request.logger.middleware';
import  { todoRoutes } from './todo.controller';

const app = express();
app.use(cors());
app.use(bodyparser.json());

// TODO - add middle ware
app.use(requestLoggerMiddleware);
app.use(todoRoutes);

export { app };