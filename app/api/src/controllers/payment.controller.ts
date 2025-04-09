import { config } from '@config';
import { catchAsyncError } from '@middlewares';
import { DuesService, RazorpayService } from '@services';
import { ErrorHandler, successResponse } from '@utils';
import { NextFunction, Request, Response } from 'express';

const razorpayService = new RazorpayService();

export const getPaymentKey = (request: Request, response: Response, next: NextFunction) => {
    successResponse(response, 200, config.RAZORPAY_API_KEY);
    return;
};
