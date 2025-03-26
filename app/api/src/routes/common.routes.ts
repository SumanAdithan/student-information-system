import type { Router } from 'express';
import { authStatus } from '@controllers';
import { isAuthenticated } from 'middlewares/authenticate.middleware';

// Common routes
export const commonRoutes = (router: Router) => {
    router.get('/student/auth/status', isAuthenticated('student'), authStatus);
    router.get('/faculty/auth/status', isAuthenticated('faculty'), authStatus);
    router.get('/admin/auth/status', isAuthenticated('admin'), authStatus);
};
