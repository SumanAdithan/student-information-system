import { authStatus, loginByPassword, loginByQrCode, logout } from '@controllers';
import { isAuthenticated } from '@middlewares';
import { Router } from 'express';

export const authRoutes = (router: Router) => {
    router.post('/login/student', loginByPassword('student'));
    router.post('/login/qr/student', loginByQrCode('student'));

    router.post('/login/faculty', loginByPassword('faculty'));
    router.post('/login/qr/faculty', loginByQrCode('faculty'));

    router.post('/login/admin', loginByPassword('admin'));
    router.post('/login/qr/admin', loginByQrCode('admin'));

    router.get('/auth/status', isAuthenticated(), authStatus);
    router.post('/logout', isAuthenticated(), logout);
};
