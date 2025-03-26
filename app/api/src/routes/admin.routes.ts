import type { Router } from 'express';
import { loginByPassword, loginByQrCode } from '@controllers';

export const adminRoutes = (router: Router) => {};

// Auth routes
export const adminAuthRoutes = (router: Router) => {
    router.post('/login/admin', loginByPassword('admin'));
    router.post('/login/qr/admin', loginByQrCode('admin'));
};
