import type { Router } from 'express';
import { loginByPassword, loginByQrCode } from '@controllers';

export const facultyRoutes = (router: Router) => {};

// Auth routes
export const facultyAuthRoutes = (router: Router) => {
    router.post('/login/faculty', loginByPassword('faculty'));
    router.post('/login/qr/faculty', loginByQrCode('faculty'));
};
