import type { Router } from 'express';
import { createTimetable, getAuthenticatedProfileImage, getFile } from '@controllers';
import { authorizeRoles, isAuthenticated } from 'middlewares/authenticate.middleware';

export const fileRoutes = (router: Router) => {
    router.get('/file/students/:fileName', isAuthenticated(), authorizeRoles('admin', 'faculty'), getFile('students'));
    router.get(
        '/file/notes/:fileName',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty', 'student'),
        getFile('notes')
    );
    router.get(
        '/file/circular/:fileName',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty', 'student'),
        getFile('circular')
    );
    router.get(
        '/file/event/:fileName',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty', 'student'),
        getFile('event')
    );
    router.get('/profile-image', isAuthenticated(), authorizeRoles('student'), getAuthenticatedProfileImage);
};
