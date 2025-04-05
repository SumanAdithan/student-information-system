import { getAllAssignment, getAssignments, getAuthenticatedAssignment, updateAssignment } from '@controllers';
import { authorizeRoles, isAuthenticated, validate } from '@middlewares';
import { AssignmentResultSchema } from '@sis/types';
import { Router } from 'express';

export const assignmentRoutes = (router: Router) => {
    router.get('/student/assignment', isAuthenticated(), authorizeRoles('student'), getAuthenticatedAssignment);
    router.get('/assignments', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAllAssignment);
    router.get('/assignments/:registerNo', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAssignments);
    router.patch(
        '/assignments',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty'),
        validate(AssignmentResultSchema),
        updateAssignment
    );
};
