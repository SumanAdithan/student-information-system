import { Router } from 'express';
import { studentAuthRoutes, studentRoutes } from './student.routes';
import { facultyAuthRoutes } from './faculty.routes';
import { adminAuthRoutes } from './admin.routes';
import { commonRoutes } from './common.routes';

const router = Router();

export default (): Router => {
    // Student routes
    studentAuthRoutes(router);
    studentRoutes(router);

    // Faculty routes
    facultyAuthRoutes(router);

    // Admin routes
    adminAuthRoutes(router);

    // common routes
    commonRoutes(router);

    return router;
};
