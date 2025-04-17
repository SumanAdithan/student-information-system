import { createNotes, getAllNotes } from '@controllers';
import { authorizeRoles, isAuthenticated, uploadSingleFile, validate, validateFile } from '@middlewares';
import { NotesSchema } from '@sis/types';
import type { Router } from 'express';

export const notesRoutes = (router: Router) => {
    router.get('/notes', isAuthenticated(), authorizeRoles('student', 'faculty', 'admin'), getAllNotes);
    router.post(
        '/admin/notes',
        isAuthenticated(),
        authorizeRoles('admin'),
        uploadSingleFile('notes'),
        validateFile('notes'),
        validate(NotesSchema),
        createNotes
    );
};
