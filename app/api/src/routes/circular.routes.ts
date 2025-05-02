import { addCircular, getAllCircular } from '@controllers';
import { authorizeRoles, isAuthenticated, uploadSingleFile, validate, validateFile } from '@middlewares';
import { CircularSchemaServer } from '@sis/types';
import type { Router } from 'express';

export const circularRoutes = (router: Router) => {
    router.get('/circulars', isAuthenticated(), authorizeRoles('student', 'faculty', 'admin'), getAllCircular);
    router.post(
        '/admin/circular/new',
        isAuthenticated(),
        authorizeRoles('admin'),
        uploadSingleFile('file'),
        validateFile('circular'),
        validate(CircularSchemaServer),
        addCircular
    );
};
