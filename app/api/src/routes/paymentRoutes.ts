import type { Router } from 'express';
import { getPaymentKey, processPayment, verifyPayment } from '@controllers';
import { authorizeRoles, isAuthenticated } from 'middlewares/authenticate.middleware';

export const paymentRoutes = (router: Router) => {
    router.get('/payment/key', isAuthenticated(), authorizeRoles('student'), getPaymentKey);
    router.post('/payment/process', isAuthenticated(), authorizeRoles('student'), processPayment);
    router.post('/payment/verify', isAuthenticated(), authorizeRoles('student'), verifyPayment);
};
