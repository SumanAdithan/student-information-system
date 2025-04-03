import { Router } from 'express';
import { studentAuthRoutes, studentRoutes } from './student.routes';
import { facultyAuthRoutes, facultyRoutes } from './faculty.routes';
import { adminAuthRoutes, adminStudentRoutes } from './admin.routes';
import { commonRoutes } from './common.routes';

const router = Router();

export default (): Router => {
    // Student routes
    studentAuthRoutes(router);
    studentRoutes(router);

    // Faculty routes
    facultyAuthRoutes(router);
    facultyRoutes(router);

    // Admin routes
    adminAuthRoutes(router);
    adminStudentRoutes(router);

    // common routes
    commonRoutes(router);

    return router;
};
