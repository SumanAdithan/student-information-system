import { config } from '@config';
import { catchAsyncError } from '@middlewares';
import { RazorpayService } from '@services';
import { PayDuesDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { NextFunction, Request, Response } from 'express';

const razorpayService = new RazorpayService();

export const getPaymentKey = (request: Request, response: Response, next: NextFunction) => {
    successResponse(response, 200, config.RAZORPAY_API_KEY);
    return;
};

export const processPayment = catchAsyncError(async (request: Request<{}, {}, PayDuesDto>, response, next) => {
    const processPayment = await razorpayService.processPayment(request.body);
    if (!processPayment.success) return next(new ErrorHandler(400, 'Unable to make Payment'));
    return successResponse(response, 200, processPayment.order);
});

export const verifyPayment = catchAsyncError(async (request, response, next) => {
    const isAuthentic = razorpayService.verifyPayment(request.body);
    if (!isAuthentic) return next(new ErrorHandler(400, 'Invalid Payment'));

    return successResponse(response, 200);
});
