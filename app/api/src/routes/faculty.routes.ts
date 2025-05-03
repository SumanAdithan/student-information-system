import { createFaculty, deleteFaculty, downloadFacultyQrcode, getAllFaculties, updateFaculty } from '@controllers';
import { authorizeRoles, isAuthenticated, validate } from '@middlewares';
import { FacultySchema, FacultyUpdateSchema } from '@sis/types';
import type { Router } from 'express';

export const facultyRoutes = (router: Router) => {
    router.get('/faculties', isAuthenticated(), authorizeRoles('admin'), getAllFaculties);
    router.post('/faculty/new', isAuthenticated(), authorizeRoles('admin'), validate(FacultySchema), createFaculty);
    router.patch(
        '/faculty/:facultyId',
        isAuthenticated(),
        authorizeRoles('admin'),
        validate(FacultyUpdateSchema),
        updateFaculty
    );
    router.delete('/faculty/:facultyId', isAuthenticated(), authorizeRoles('admin'), deleteFaculty);
    router.get('/faculty/:facultyId/qrcode', isAuthenticated(), authorizeRoles('admin'), downloadFacultyQrcode);
};
