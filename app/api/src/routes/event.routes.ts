import { addEvent, deleteEvent, getAllEvent } from '@controllers';
import { authorizeRoles, isAuthenticated, uploadSingleFile, validate, validateFile } from '@middlewares';
import { EventSchemaServer } from '@sis/types';
import type { Router } from 'express';

export const eventRoutes = (router: Router) => {
    router.get('/events', isAuthenticated(), authorizeRoles('student', 'faculty', 'admin'), getAllEvent);
    router.post(
        '/admin/event/new',
        isAuthenticated(),
        authorizeRoles('admin'),
        uploadSingleFile('file'),
        validateFile('event'),
        validate(EventSchemaServer),
        addEvent
    );
    router.delete('/event/:eventId', isAuthenticated(), authorizeRoles('admin'), deleteEvent);
};
