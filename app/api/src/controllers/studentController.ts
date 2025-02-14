import { getAllStudents } from '@models';
import { NextFunction, Request, Response } from 'express-serve-static-core';

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const students=await getAllStudents();
        res.status(200).json({
            success:true,
            students,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:'Internal server Error',
        })
    }
    
};
