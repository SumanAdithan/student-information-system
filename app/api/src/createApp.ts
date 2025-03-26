import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import routes from '@routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from '@middlewares';

export const createApp = () => {
    const app = express();
    dotenv.config({ path: path.join(__dirname, 'config/config.env') });

    app.use(
        cors({
            origin: 'http://localhost:5173',
            credentials: true,
        })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/v1', routes());
    app.use(errorMiddleware);
    return app;
};
