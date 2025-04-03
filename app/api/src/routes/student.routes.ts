import type { Router } from 'express';
import { getAuthenticatedAssignment, getAuthenticatedStudent, loginByPassword, loginByQrCode } from '@controllers';
import { authorizeRoles, isAuthenticated } from 'middlewares/authenticate.middleware';

export const studentRoutes = (router: Router) => {
    router.get('/student', isAuthenticated(), authorizeRoles('student'), getAuthenticatedStudent);
    router.get('/student/assignment', isAuthenticated(), authorizeRoles('student'), getAuthenticatedAssignment);
};

// Auth routes
export const studentAuthRoutes = (router: Router) => {
    router.post('/login/student', loginByPassword('student'));
    router.post('/login/qr/student', loginByQrCode('student'));
};
