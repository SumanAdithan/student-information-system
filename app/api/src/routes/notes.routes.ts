import { createNotes } from '@controllers';
import { authorizeRoles, isAuthenticated, uploadSingleFile, validate, validateFile } from '@middlewares';
import { NotesSchema } from '@sis/types';
import type { Router } from 'express';

export const notesRoutes = (router: Router) => {
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
