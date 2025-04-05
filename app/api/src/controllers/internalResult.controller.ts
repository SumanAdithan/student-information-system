import { catchAsyncError } from '@middlewares';
import { InternalResultService } from '@services';
import { InternalResultDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';

export const getAuthenticatedInternalResult = catchAsyncError(async (request, response, next) => {
    const { user } = request;
    if (!user) return next(new ErrorHandler(401, 'Unauthenticated'));

    const internalResult = await InternalResultService.getInternalResults(user.registerNo);
    if (!internalResult) return next(new ErrorHandler(400, 'Unable to get Internal Result'));

    successResponse(response, 200, internalResult);
});

export const getAllInternalResult = catchAsyncError(async (request, response, next) => {
    const internalResults = await InternalResultService.getAllInternalResult(request.query);
    if (!internalResults) return next(new ErrorHandler(400, 'Unable to get Internal Result'));

    successResponse(response, 200, internalResults);
});

export const getInternalResults = catchAsyncError(async (request: Request<{ registerNo: string }>, response, next) => {
    const internalResults = await InternalResultService.getInternalResults(parseInt(request.params.registerNo));
    if (!internalResults) return next(new ErrorHandler(400, 'Unable to get Internal Result'));
    successResponse(response, 200, internalResults);
});

export const updateInternalResult = catchAsyncError(
    async (request: Request<{}, {}, InternalResultDto>, response, next) => {
        const internalResult = request.body;
        const { registerNo, result, code, mark } = internalResult;
        await InternalResultService.updateInternalResult(registerNo, result, code, mark);
        successResponse(response, 200, '', 'Internal Result updated');
    }
);
