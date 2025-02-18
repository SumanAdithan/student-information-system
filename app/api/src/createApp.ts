import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import routes from '@routes';
import { errorMiddleware } from '@middlewares';

export const createApp = () => {
    const app = express();
    dotenv.config({ path: path.join(__dirname, 'config/config.env') });

    app.use(express.json());
    app.use('/api/v1', routes());
    app.use(errorMiddleware);
    return app;
};
