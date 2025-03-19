import { catchAsyncError } from '@middlewares';
import { getStudentByEmail } from '@models';
import { ErrorHandler } from '@utils';
import { NextFunction, Request, Response } from 'express-serve-static-core';

export const loginStudent = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || password) return next(new ErrorHandler('Please enter email and password', 400));

    const student = await getStudentByEmail(email);
    if (!student) return next(new ErrorHandler('Invalid Email or Password', 401));
});
