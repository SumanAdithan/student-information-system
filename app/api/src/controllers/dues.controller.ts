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
    successResponse(response, 200, '', 'Dues Result updated');
});

export const updateOfflinePayment = catchAsyncError(async (request: Request<{}, {}, PayDuesDto>, response, next) => {
    await DuesService.updateOfflinePayment(request.body);
    successResponse(response, 200, '', 'Dues Result updated');
});
