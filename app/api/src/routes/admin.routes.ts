import type { Router } from 'express';
import { createNewStudent, deleteStudent, loginByPassword, loginByQrCode, updateStudent } from '@controllers';
import { StudentSchema, UpdateStudentSchema } from '@sis/types';
import { authorizeRoles, isAuthenticated, validate, uploadSingleFile } from '@middlewares';

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
        uploadSingleFile('profileImage'),
        validate(StudentSchema),
        createNewStudent
    );
    router.patch(
        '/admin/student/:studentId',
        isAuthenticated(),
        authorizeRoles('admin'),
        uploadSingleFile('profileImage'),
        validate(UpdateStudentSchema),
        updateStudent
    );
    router.delete('/admin/student/:studentId', isAuthenticated(), authorizeRoles('admin'), deleteStudent);
};
