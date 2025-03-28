import { Request, Response, NextFunction } from 'express';

// Catching asynchronous error
export const catchAsyncError = <P>(
    func: (request: Request<P>, response: Response, next: NextFunction) => Promise<any>
) => {
    return (request: Request<P>, response: Response, next: NextFunction) => {
        Promise.resolve(func(request, response, next)).catch(next);
    };
};
