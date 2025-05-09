import express from 'express';
import routes from '@routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from '@middlewares';

export const createApp = () => {
    const app = express();

    app.use(
        cors({
            origin: 'http://localhost:5173',
            credentials: true,
            exposedHeaders: ['Content-Disposition'],
        })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/v1', routes());
    app.use(errorMiddleware);
    return app;
};
