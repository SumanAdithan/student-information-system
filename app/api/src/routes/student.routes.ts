import type { Router } from 'express';
import { createNewStudent, deleteStudent, getAllStudent, getAuthenticatedStudent, updateStudent } from '@controllers';
import { authorizeRoles, isAuthenticated } from 'middlewares/authenticate.middleware';
import { uploadSingleFile, validate } from '@middlewares';
import { StudentSchema, UpdateStudentSchema } from '@sis/types';

export const studentRoutes = (router: Router) => {
    router.get('/student', isAuthenticated(), authorizeRoles('student'), getAuthenticatedStudent);
    router.get('/students', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAllStudent);
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
