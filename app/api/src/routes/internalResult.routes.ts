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
    router.get('/internal-result', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAllInternalResult);
    router.get(
        '/internal-result/:registerNo',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty'),
        getInternalResults
    );
    router.patch(
        '/internal-result',
        isAuthenticated(),
        authorizeRoles('admin', 'faculty'),
        validate(InternalResultSchema),
        updateInternalResult
    );
};
