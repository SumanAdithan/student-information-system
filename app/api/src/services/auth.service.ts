import {
    getAdminByEmail,
    getAdminById,
    getFacultyByEmail,
    getFacultyById,
    getStudentByEmail,
    getStudentById,
} from '@models';
import { ErrorHandler, getJwtToken, isValidPassword, verifyJwtToken } from '@utils';

import type { UserRole } from '@sis/types';

export class AuthService {
    // Login by password service by roles
    static async loginUserByPassword(role: UserRole, email: string, password: string) {
        let user;
        if (role === 'student') user = await getStudentByEmail(email).select('+password');
        if (role === 'faculty') user = await getFacultyByEmail(email).select('+password');
        if (role === 'admin') user = await getAdminByEmail(email).select('+password');
        if (!user) throw new ErrorHandler(401, 'Invalid Email or Password');

        const isMatch = await isValidPassword(password, user.password);
        if (!isMatch) throw new ErrorHandler(401, 'Invalid Email or Password');

        const token = getJwtToken(user.id.toString(), user.role as UserRole);

        return { token, redirectUrl: AuthService.getRedirectUrl(role) };
    }

    // Login by QR service by roles
    static async loginUserByQrCode(role: UserRole, qrToken: string) {
        const decodedToken = verifyJwtToken(qrToken);
        if (typeof decodedToken === 'string') throw new ErrorHandler(400, 'Invalid QR Code');

        let user;
        if (role === 'student') user = await getStudentById(decodedToken.id).select('+qrCode');
        if (role === 'faculty') user = await getFacultyById(decodedToken.id).select('+qrCode');
        if (role === 'admin') user = await getAdminById(decodedToken.id).select('+qrCode');
        if (!user) throw new ErrorHandler(400, 'Invalid QR Code');

        const isValidToken = await isValidPassword(qrToken, user.qrCode);
        if (!isValidToken) throw new ErrorHandler(400, 'Invalid QR Code');

        const token = getJwtToken(user.id.toString(), user.role as UserRole);
        return { token, redirectUrl: AuthService.getRedirectUrl(role) };
    }

    // Change password
    static async changePassword(role: UserRole, id: string, oldPassword: string, newPassword: string) {
        let user;
        if (role === 'student') user = await getStudentById(id).select('+password');

        const isMatch = isValidPassword(oldPassword, user.password);
        if (!isMatch) throw new ErrorHandler(401, 'Old password is incorrect');

        user.password = newPassword;
        await user.save();
    }

    // Redirect url by roles
    private static getRedirectUrl(role: UserRole) {
        return role === 'student' ? '/student' : role === 'faculty' ? '/faculty' : role === 'admin' ? '/admin' : '/';
    }
}
