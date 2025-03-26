import { ErrorHandler, successResponse } from '@utils';
import { NextFunction, Request, Response } from 'express';

export const getAuthenticatedStudent = (request: Request, response: Response, next: NextFunction) => {
    const { user } = request;
    if (!user) return next(new ErrorHandler(401, 'Unauthenticated'));

    successResponse(response, 200, user);
    return;
};
