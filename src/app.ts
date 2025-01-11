/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleWear/globalErrorHandler';
import notFound from './app/middleWear/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Application
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    // Promise.reject();
    res.send('Hello World!');
});

//Global error handler
app.use(globalErrorHandler);
//Not found
app.use(notFound);

//console.log(process.cwd());
export default app;
