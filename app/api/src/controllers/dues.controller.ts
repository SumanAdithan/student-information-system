import { catchAsyncError } from '@middlewares';
import { DuesService } from '@services';
import { DuesDto, PayDuesDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';

export const getAuthenticatedDues = catchAsyncError(async (request, response, next) => {
    const { user } = request;
    if (!user) return next(new ErrorHandler(401, 'Unauthenticated'));

    const dues = await DuesService.getDues(user.registerNo);
    if (!dues) return next(new ErrorHandler(400, 'Unable to get Dues'));

    successResponse(response, 200, dues);
});

export const getAllDues = catchAsyncError(async (request, response, next) => {
    const duesData = await DuesService.getAllDues(request.query);
    if (!duesData) return next(new ErrorHandler(400, 'Unable to get Dues Result'));
    successResponse(response, 200, duesData);
});

export const getDues = catchAsyncError(async (request: Request<{ registerNo: string }>, response, next) => {
    const dues = await DuesService.getDues(parseInt(request.params.registerNo));
    if (!dues) return next(new ErrorHandler(400, 'Unable to get Dues Result'));
    successResponse(response, 200, dues);
});

export const updateDues = catchAsyncError(async (request: Request<{}, {}, DuesDto>, response, next) => {
    await DuesService.updateDues(request.body);
    successResponse(response, 200, null, 'Dues Result updated');
});

export const updateOfflineDuesPayment = catchAsyncError(
    async (request: Request<{}, {}, PayDuesDto>, response, next) => {
        const dues = await DuesService.updateOfflineDuesPayment(request.body);
        console.log(dues);
        successResponse(response, 200, dues, 'Dues Result updated');
    }
);

export const processOnlineDuesPayment = catchAsyncError(
    async (request: Request<{}, {}, PayDuesDto>, response, next) => {
        const processPayment = await DuesService.processOnlineDuesPayment(request.body);
        if (!processPayment.success) return next(new ErrorHandler(400, 'Unable to make Payment'));
        return successResponse(response, 200, processPayment.order);
    }
);

export const verifyOnlineDuesPayment = catchAsyncError(async (request, response, next) => {
    const isAuthentic = await DuesService.verifyOnlineDuesPayment(request.body);
    if (!isAuthentic) return next(new ErrorHandler(400, 'Invalid Payment'));

    const { duesData, paymentReceipt } = isAuthentic;

    return successResponse(response, 200, duesData, 'Payment successfull');
});

export const processOnlinePendingPayment = catchAsyncError(
    async (request: Request<{}, {}, PayDuesDto>, response, next) => {
        const processPayment = await DuesService.processOnlinePendingPayment(request.body);
        if (!processPayment.success) return next(new ErrorHandler(400, 'Unable to make Payment'));
        return successResponse(response, 200, processPayment.order);
    }
);

export const verifyOnlinePendingPayment = catchAsyncError(async (request, response, next) => {
    const isAuthentic = await DuesService.verifyOnlinePendingPayment(request.body);
    if (!isAuthentic) return next(new ErrorHandler(400, 'Invalid Payment'));

    return successResponse(response, 200, isAuthentic.duesData, 'Payment successfull');
});

export const updateOfflinePendingPayment = catchAsyncError(
    async (request: Request<{}, {}, PayDuesDto>, response, next) => {
        const dues = await DuesService.updateOfflinePendingPayment(request.body);
        successResponse(response, 200, dues, 'Dues Result updated');
    }
);

export const resetDues = catchAsyncError(async (request: Request<{ registerNo: string }>, response, next) => {
    console.log(request.params.registerNo);
    const dues = await DuesService.resetDues(parseInt(request.params.registerNo));
    successResponse(response, 200, dues, 'Dues Resetted updated');
});
