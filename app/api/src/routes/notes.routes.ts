import { addNotes, deleteNotes, getAllNotes } from '@controllers';
import { authorizeRoles, isAuthenticated, uploadSingleFile, validate, validateFile } from '@middlewares';
import { NotesSchemaServer } from '@sis/types';
import type { Router } from 'express';

export const notesRoutes = (router: Router) => {
    router.get('/notes', isAuthenticated(), authorizeRoles('student', 'faculty', 'admin'), getAllNotes);
    router.post(
        '/admin/notes/new',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty'),
        uploadSingleFile('file'),
        validateFile('notes'),
        validate(NotesSchemaServer),
        addNotes
    );
    router.delete('/notes/:notesId', isAuthenticated(), authorizeRoles('admin'), deleteNotes);
};
