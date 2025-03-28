import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '@utils';

// Handle error response
export const errorMiddleware = (err: ErrorHandler, request: Request, response: Response, next: NextFunction) => {
    let { message, statusCode } = err;
    statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        response.status(statusCode).json({
            success: false,
            message,
            stack: err.stack,
            error: err,
            errorDetails: err.details,
        });

        return;
    } else if (process.env.NODE_ENV == 'production') {
        let error = new ErrorHandler(statusCode, message);

        if (err.name === 'ValidationError') {
            message = Object.values((err as any).errors)
                .map((value: any) => value.meassge)
                .join(',');

            error = new ErrorHandler(400, message);
        }

        if (err.name === 'ZodError') {
            error = new ErrorHandler(400, 'Validation Failed', 'ZodError', err.details);
        }

        if (err.name === 'CastError') {
            message = `Resource not found : ${(err as any).path}`;
            error = new ErrorHandler(400, message);
        }

        if ('code' in err && err.code === 11000) {
            const field = Object.keys((err as any).keyValue)[0];
            let message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
            // let message = `Duplicate ${Object.keys((err as any).keyValue)} error`;
            error = new ErrorHandler(400, message);
        }

        if (err.name === 'JsonWebTokenError') {
            let message = `JSON Web Token is invalid. Try again`;
            error = new ErrorHandler(400, message);
        }

        if (err.name === 'TokenExpiredError') {
            let message = `JSON Web Token is expired. Try again`;
            error = new ErrorHandler(400, message);
        }

        response.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal server Error',
            errorDetails: error.details || {},
        });

        return;
    }
};
