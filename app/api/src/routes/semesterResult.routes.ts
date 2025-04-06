import {
    getAllSemesterResult,
    getAuthenticatedSemesterResult,
    getSemesterResults,
    updateSemesterResult,
} from '@controllers';
import { authorizeRoles, isAuthenticated, validate } from '@middlewares';
import { SemesterResultSchema } from '@sis/types';
import { Router } from 'express';

export const semesterResultRoutes = (router: Router) => {
    router.get(
        '/student/semester-results',
        isAuthenticated(),
        authorizeRoles('student'),
        getAuthenticatedSemesterResult
    );
    router.get('/semester-results', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAllSemesterResult);
    router.get(
        '/semester-results/:registerNo',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty'),
        getSemesterResults
    );
    router.patch(
        '/semester-results',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty'),
        validate(SemesterResultSchema),
        updateSemesterResult
    );
};
