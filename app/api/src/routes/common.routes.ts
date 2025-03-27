import type { Router } from 'express';
import { authStatus, logout } from '@controllers';
import { isAuthenticated } from 'middlewares/authenticate.middleware';

// Common routes
export const commonRoutes = (router: Router) => {
    router.get('/auth/status', isAuthenticated(), authStatus);
    router.post('/logout', isAuthenticated(), logout);
};
