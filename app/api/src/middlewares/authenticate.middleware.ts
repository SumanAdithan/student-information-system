import { UserRole } from '@sis/types';
import { catchAsyncError } from './catchAsyncError.middleware';
import { ErrorHandler, verifyJwtToken } from '@utils';
import { getAdminById, getFacultyById, getStudentById } from '@models';
import { NextFunction, Request, Response } from 'express';

// Check authenticated
export const isAuthenticated = (role: UserRole) =>
    catchAsyncError(async (request, response, next) => {
        const { token } = request.cookies;
        if (!token) return next(new ErrorHandler(401, 'Login first to handle this resource'));

        const decodedToken = verifyJwtToken(token);
        if (typeof decodedToken === 'string') {
            return next(new ErrorHandler(400, 'Invalid token format'));
        }

        let user;
        if (role.includes('student')) user = await getStudentById(decodedToken.id);
        if (role.includes('faculty')) user = await getFacultyById(decodedToken.id);
        if (role.includes('admin')) user = await getAdminById(decodedToken.id);
        if (!user || !role.includes(user.role as UserRole)) {
            return next(new ErrorHandler(403, 'Unauthorized access'));
        }

        request.user = user;
        next();
    });

// Check respective roles
export const authorizeRoles = (...roles: UserRole[]) => {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!roles.includes(request.user.role)) return next(new ErrorHandler(403, 'Unauthorized access'));
        next();
    };
};
