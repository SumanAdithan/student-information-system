import type { Router } from 'express';
import {
    getAllAssignment,
    getAllStudent,
    getAssignments,
    loginByPassword,
    loginByQrCode,
    updateAssignment,
} from '@controllers';
import { authorizeRoles, isAuthenticated } from '@middlewares';

export const facultyRoutes = (router: Router) => {
    router.get('/students', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAllStudent);
    router.get('/assignments', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAllAssignment);
    router.get('/assignments/:registerNo', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAssignments);
    router.patch('/assignments', isAuthenticated(), authorizeRoles('admin', 'faculty'), updateAssignment);
};

// Auth routes
export const facultyAuthRoutes = (router: Router) => {
    router.post('/login/faculty', loginByPassword('faculty'));
    router.post('/login/qr/faculty', loginByQrCode('faculty'));
};
