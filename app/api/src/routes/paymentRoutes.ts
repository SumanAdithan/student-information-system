import type { Router } from 'express';
import { getPaymentKey } from '@controllers';
import { authorizeRoles, isAuthenticated } from 'middlewares/authenticate.middleware';

export const paymentRoutes = (router: Router) => {
    router.get('/payment/key', isAuthenticated(), authorizeRoles('student'), getPaymentKey);
};
