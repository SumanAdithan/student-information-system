import type { Router } from 'express';
import { authStatus, getAllStudent, getFile, logout } from '@controllers';
import { authorizeRoles, isAuthenticated } from 'middlewares/authenticate.middleware';

// Common routes
export const commonRoutes = (router: Router) => {
    router.get('/auth/status', isAuthenticated(), authStatus);
    router.post('/logout', isAuthenticated(), logout);
    router.get('/students', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAllStudent);
    router.get('/file/:folder/:fileName', isAuthenticated(), authorizeRoles('admin', 'faculty', 'student'), getFile);
};
