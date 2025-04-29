import type { Router } from 'express';
import { getAllStudentTimetable, getAuthenticatedStudentTimetable, updateStudentTimetable } from '@controllers';
import { authorizeRoles, isAuthenticated } from '@middlewares';

export const studentTimetableRoutes = (router: Router) => {
    router.get('/student/timetable', isAuthenticated(), authorizeRoles('student'), getAuthenticatedStudentTimetable);
    router.get('/student/timetables', isAuthenticated(), authorizeRoles('admin'), getAllStudentTimetable);
    router.patch('/student/timetable', isAuthenticated(), authorizeRoles('admin'), updateStudentTimetable);
};
