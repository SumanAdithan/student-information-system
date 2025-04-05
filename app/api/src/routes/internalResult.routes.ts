import {
    getAllInternalResult,
    getAuthenticatedInternalResult,
    getInternalResults,
    updateInternalResult,
} from '@controllers';
import { authorizeRoles, isAuthenticated, validate } from '@middlewares';
import { InternalResultSchema } from '@sis/types';
import { Router } from 'express';

export const internalResultRoutes = (router: Router) => {
    router.get(
        '/student/internal-results',
        isAuthenticated(),
        authorizeRoles('student'),
        getAuthenticatedInternalResult
    );
    router.get('/internal-results', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAllInternalResult);
    router.get(
        '/internal-results/:registerNo',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty'),
        getInternalResults
    );
    router.patch(
        '/internal-results',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty'),
        validate(InternalResultSchema),
        updateInternalResult
    );
};
