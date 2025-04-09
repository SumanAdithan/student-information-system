import {
    getAllDues,
    getAuthenticatedDues,
    getDues,
    processOnlineDuesPayment,
    processOnlinePendingPayment,
    updateDues,
    updateOfflineDuesPayment,
    updateOfflinePendingPayment,
    verifyOnlineDuesPayment,
    verifyOnlinePendingPayment,
} from '@controllers';
import { authorizeRoles, isAuthenticated, validate } from '@middlewares';
import { DuesSchema, PayDuesSchema } from '@sis/types';
import { Router } from 'express';

export const duesRoutes = (router: Router) => {
    router.get('/student/dues', isAuthenticated(), authorizeRoles('student'), getAuthenticatedDues);
    router.get('/dues', isAuthenticated(), authorizeRoles('admin', 'faculty'), getAllDues);
    router.get('/dues/:registerNo', isAuthenticated(), authorizeRoles('admin', 'faculty'), getDues);
    router.patch('/dues', isAuthenticated(), authorizeRoles('admin'), validate(DuesSchema), updateDues);
    router.patch(
        '/dues/offline-payment',
        isAuthenticated(),
        authorizeRoles('admin'),
        validate(PayDuesSchema),
        updateOfflineDuesPayment
    );
    router.post('/dues/online-payment/process', isAuthenticated(), authorizeRoles('student'), processOnlineDuesPayment);
    router.post('/dues/online-payment/verify', isAuthenticated(), authorizeRoles('student'), verifyOnlineDuesPayment);
    router.post(
        '/dues/pending/online-payment/process',
        isAuthenticated(),
        authorizeRoles('student'),
        processOnlinePendingPayment
    );
    router.post(
        '/dues/pending/online-payment/verify',
        isAuthenticated(),
        authorizeRoles('student'),
        verifyOnlinePendingPayment
    );
    router.patch(
        '/dues/pending/offline-payment',
        isAuthenticated(),
        authorizeRoles('admin'),
        validate(PayDuesSchema),
        updateOfflinePendingPayment
    );
};
