import {
    getAllDuesAndApprovals,
    getAuthenticatedDuesAndApprovals,
    getDuesAndApprovals,
    updateDuesAndApprovals,
} from '@controllers';
import { authorizeRoles, isAuthenticated } from '@middlewares';
import type { Router } from 'express';

export const duesAndApprovalsRoutes = (router: Router) => {
    router.get(
        '/student/dues-and-approval',
        isAuthenticated(),
        authorizeRoles('student'),
        getAuthenticatedDuesAndApprovals
    );
    router.get('/dues-and-approvals', isAuthenticated(), authorizeRoles('faculty', 'admin'), getAllDuesAndApprovals);
    router.get(
        '/dues-and-approvals/:registerNo',
        isAuthenticated(),
        authorizeRoles('faculty', 'admin'),
        getDuesAndApprovals
    );
    router.patch(
        '/dues-and-approvals/:registerNo',
        isAuthenticated(),
        authorizeRoles('faculty', 'admin'),
        updateDuesAndApprovals
    );
};
