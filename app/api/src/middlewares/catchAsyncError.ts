import {Request,Response,NextFunction } from 'express-serve-static-core';

export const catchAsyncError = (func:(req:Request,res:Response,next:NextFunction) => Promise<any>) =>{
    return(req:Request,res:Response,next:NextFunction) =>{
        Promise.resolve(func(req,res,next).catch(next));
    }

}