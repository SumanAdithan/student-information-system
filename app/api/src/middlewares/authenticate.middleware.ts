import { UserRole } from '@sis/types';
import { catchAsyncError } from './catchAsyncError.middleware';
import { ErrorHandler, verifyJwtToken } from '@utils';
import { getAdminById, getFacultyById, getStudentById } from '@models';
import { NextFunction, Request, Response } from 'express';

// Check authenticated
export const isAuthenticated = () =>
    catchAsyncError(async (request, response, next) => {
        const { token } = request.cookies;
        if (!token) return next(new ErrorHandler(401, 'Not Authenticated'));

        const decodedToken = verifyJwtToken(token);
        if (!decodedToken || typeof decodedToken !== 'object') {
            return next(new ErrorHandler(400, 'Invalid token format'));
        }

        const fetchUserByRole: Record<string, (id: string) => Promise<any>> = {
            student: getStudentById,
            faculty: getFacultyById,
            admin: getAdminById,
        };
        const fetchUser = fetchUserByRole[decodedToken.role];
        if (!fetchUser) return next(new ErrorHandler(403, 'Unauthorized access'));

        const user = await fetchUser(decodedToken.id);
        if (!user) return next(new ErrorHandler(403, 'Unauthorized access'));

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
