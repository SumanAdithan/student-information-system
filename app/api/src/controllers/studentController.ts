import { catchAsyncError } from '@middlewares';
import { getAllStudents } from '@models';
import { NextFunction, Request, Response } from 'express-serve-static-core';

export const getStudents = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
    const students=await getAllStudents();
    res.status(200).json({
        success:true,
        students,
    });
    
    
});
