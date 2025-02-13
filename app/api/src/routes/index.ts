import { Router } from 'express';
import { studentRoutes } from './studentRoutes';

const router = Router();

export default (): Router => {
    studentRoutes(router);
    return router;
};
