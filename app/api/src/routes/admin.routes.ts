import type { Router } from 'express';
import { createNewStudent, deleteStudent, loginByPassword, loginByQrCode, updateStudent } from '@controllers';
import { validate } from 'middlewares/validate.middleware';
import { StudentSchema, UpdateStudentSchema } from '@sis/types';
import { authorizeRoles, isAuthenticated } from 'middlewares/authenticate.middleware';

export const adminRoutes = (router: Router) => {};

// Auth routes
export const adminAuthRoutes = (router: Router) => {
    router.post('/login/admin', loginByPassword('admin'));
    router.post('/login/qr/admin', loginByQrCode('admin'));
};

// Admin student routes
export const adminStudentRoutes = (router: Router) => {
    router.post(
        '/admin/student/new',
        isAuthenticated(),
        authorizeRoles('admin'),
        validate(StudentSchema),
        createNewStudent
    );
    router.patch(
        '/admin/student/:studentId',
        isAuthenticated(),
        authorizeRoles('admin'),
        validate(UpdateStudentSchema),
        updateStudent
    );
    router.delete('/admin/student/:studentId', isAuthenticated(), authorizeRoles('admin'), deleteStudent);
};
