import { getAllDues, getAuthenticatedDues, getDues, updateDues } from '@controllers';
import { authorizeRoles, isAuthenticated, validate } from '@middlewares';
import { DuesSchema } from '@sis/types';
import { Router } from 'express';

export const duesRoutes = (router: Router) => {
    router.get('/student/dues', isAuthenticated(), authorizeRoles('student'), getAuthenticatedDues);
    router.get('/dues', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAllDues);
    router.get('/dues/:registerNo', isAuthenticated(), authorizeRoles('admin', 'faculty'), getDues);
    router.patch('/dues', isAuthenticated(), authorizeRoles('admin', 'faculty'), validate(DuesSchema), updateDues);
};
