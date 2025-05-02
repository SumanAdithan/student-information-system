import { catchAsyncError } from '@middlewares';
import { DuesAndApprovalsService } from '@services';
import { QueryParams, UpdateDuesAndApprovalsDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';

export const getAuthenticatedDuesAndApprovals = catchAsyncError(async (request: Request, response, next) => {
    const { user } = request;
    if (!user) return next(new ErrorHandler(401, 'Unauthenticated'));

    const duesAndApprovals = await DuesAndApprovalsService.getAuthenticatedDuesAndApprovals(user.registerNo);
    if (!duesAndApprovals) return next(new ErrorHandler(400, 'Unable to get dues and approvals'));

    return successResponse(response, 200, duesAndApprovals);
});

export const getAllDuesAndApprovals = catchAsyncError(async (request, response, next) => {
    const duesAndApprovals = await DuesAndApprovalsService.getAllDuesAndApprovals(request.query);
    if (!duesAndApprovals) return next(new ErrorHandler(400, 'Unable to get dues and approvals'));

    return successResponse(response, 200, duesAndApprovals);
});

export const getDuesAndApprovals = catchAsyncError(async (request: Request<{ registerNo: string }>, response, next) => {
    const { registerNo } = request.params;

    const duesAndApprovals = await DuesAndApprovalsService.getDuesAndApprovals(parseInt(registerNo));
    if (!duesAndApprovals) return next(new ErrorHandler(400, 'Unable to get dues and approvals'));

    return successResponse(response, 200, duesAndApprovals);
});

export const updateDuesAndApprovals = catchAsyncError(
    async (request: Request<{ registerNo: string }, {}, UpdateDuesAndApprovalsDto>, response, next) => {
        const { registerNo } = request.params;
        const duesAndApprovals = DuesAndApprovalsService.updateDuesAndApprovals(parseInt(registerNo), request.body);

        return successResponse(response, 200);
    }
);
