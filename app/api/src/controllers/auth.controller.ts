import { catchAsyncError } from '@middlewares';
import { UserRole } from '@sis/types';
import { ErrorHandler, successResponse, tokenResponse } from '@utils';
import { AuthService } from '@services';
import { NextFunction, Request, Response } from 'express';

// Login by password - api/v1/login
export const loginByPassword = (role: UserRole) =>
    catchAsyncError(async (request, response, next) => {
        const { email, password } = request.body;
        if (!email || !password) return next(new ErrorHandler(400, 'Please enter email and password'));

        const { token, redirectUrl } = await AuthService.loginUserByPassword(role, email, password);
        tokenResponse(response, token, 200, redirectUrl);
    });

// Login by Qr code - api/v1/login/qr
export const loginByQrCode = (role: UserRole) =>
    catchAsyncError(async (request, response, next) => {
        const { qrToken } = request.body;
        if (!qrToken) return next(new ErrorHandler(400, 'Invalid QR Code'));

        const { token, redirectUrl } = await AuthService.loginUserByQrCode(role, qrToken);
        tokenResponse(response, token, 200, redirectUrl);
    });

// change password - api/v1/changepassword
export const changePassword = (role: UserRole) =>
    catchAsyncError(async (request, response, next) => {
        const { newPassword } = request.body;
        const { id, password } = request.user;
        await AuthService.changePassword(role, id, password, newPassword);

        successResponse(response, 200, null, 'Password Changed Successfully');
    });

// logout - api/v1/logout
export const logout = (request: Request, response: Response) => {
    response.clearCookie('token');
    successResponse(response, 200, null, ' Logged out successfully', '/');
};

// auth status - api/v1/auth/status
export const authStatus = (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) return next(new ErrorHandler(401, 'Not Authenticated'));

    const { role } = request.user;

    successResponse(response, 200, { isAuthenticated: true, role }, 'Authenticated', `/${role}`);
};
