import { NextFunction, Request, Response } from 'express-serve-static-core';

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'student api working successfully',
    });
    return;
};
