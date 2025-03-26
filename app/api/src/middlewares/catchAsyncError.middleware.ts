import { Request, Response, NextFunction } from 'express';

// Catching asynchronous error
export const catchAsyncError = (func: (request: Request, response: Response, next: NextFunction) => Promise<any>) => {
    return (request: Request, response: Response, next: NextFunction) => {
        Promise.resolve(func(request, response, next).catch(next));
    };
};
