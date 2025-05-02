import { catchAsyncError } from '@middlewares';
import { CircularService } from '@services';
import { Circular, CircularDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';

export const addCircular = catchAsyncError(async (request: Request<{}, {}, CircularDto>, response, next) => {
    const circular = request.body as Circular;
    const createCircular = await CircularService.createCircular(circular, request.file);
    if (!createCircular.success) return next(new ErrorHandler(400, 'Unable to create a circular'));
    successResponse(response, 201, null, 'Circular Created');
});

export const getAllCircular = catchAsyncError(async (request, response, next) => {
    const circular = await CircularService.getAllCircular();
    successResponse(response, 200, circular);
});

export const deleteCircular = catchAsyncError(async (request: Request<{ circularId: string }>, response, next) => {
    const { circularId } = request.params;
    const deleteCirculat = await CircularService.deleteCircular(circularId);
    successResponse(response, 200);
});
