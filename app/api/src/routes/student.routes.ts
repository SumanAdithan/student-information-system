import type { Router } from 'express';
import { getAuthenticatedStudent, loginByPassword, loginByQrCode } from '@controllers';
import { authorizeRoles, isAuthenticated } from 'middlewares/authenticate.middleware';

export const studentRoutes = (router: Router) => {
    router.get('/student', isAuthenticated('student'), authorizeRoles('student'), getAuthenticatedStudent);
};

// Auth routes
export const studentAuthRoutes = (router: Router) => {
    router.post('/login/student', loginByPassword('student'));
    router.post('/login/qr/student', loginByQrCode('student'));
};
