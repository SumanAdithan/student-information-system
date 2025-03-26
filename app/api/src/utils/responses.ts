import { Response, NextFunction } from 'express';
import ErrorHandler from './ErrorHandler';

// success response
export const successResponse = (response: Response, statusCode: number, data: any, message: string = 'Success') => {
    return response.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

// token response:cookie
export const tokenResponse = (response: Response, token: string, statusCode: number, redirectUrl: string) => {
    const options = {
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRES_TIME) * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    return response.cookie('token', token, options).status(statusCode).json({
        success: true,
        redirectUrl,
    });
};
