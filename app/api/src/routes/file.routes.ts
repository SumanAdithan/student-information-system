import type { Router } from 'express';
import { getFile } from '@controllers';
import { authorizeRoles, isAuthenticated } from 'middlewares/authenticate.middleware';

export const fileRoutes = (router: Router) => {
    router.get('/file/:folder/:fileName', isAuthenticated(), authorizeRoles('admin', 'faculty', 'student'), getFile);
};
