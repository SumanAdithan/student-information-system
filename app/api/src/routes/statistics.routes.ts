import { getDuesStatistics, getInternalResultStatistics } from '@controllers';
import { authorizeRoles, isAuthenticated } from '@middlewares';
import type { Router } from 'express';

export const statisticsRoutes = (router: Router) => {
    router.get('/statistics/dues', isAuthenticated(), authorizeRoles('faculty', 'admin'), getDuesStatistics);
    router.get(
        '/statistics/internal-result',
        isAuthenticated(),
        authorizeRoles('faculty', 'admin'),
        getInternalResultStatistics
    );
};
