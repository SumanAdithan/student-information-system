import type { Router } from 'express';
import { getAuthenticatedStudentTimetable } from '@controllers';
import { authorizeRoles, isAuthenticated } from '@middlewares';

export const studentTimetableRoutes = (router: Router) => {
    router.get('/student/timetable', isAuthenticated(), authorizeRoles('student'), getAuthenticatedStudentTimetable);
};
