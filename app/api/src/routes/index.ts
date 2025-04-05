import { Router } from 'express';
import { studentRoutes } from './student.routes';
import { assignmentRoutes } from './assignment.routes';
import { fileRoutes } from './file.routes';
import { authRoutes } from './auth.routes';

const router = Router();

export default (): Router => {
    authRoutes(router);
    studentRoutes(router);
    assignmentRoutes(router);
    fileRoutes(router);
    return router;
};
