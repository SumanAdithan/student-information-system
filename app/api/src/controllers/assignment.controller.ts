import { catchAsyncError } from '@middlewares';
import { AssignmentService } from '@services';
import { ErrorHandler, successResponse } from '@utils';
import { NextFunction, Request, Response } from 'express';

export const getAuthenticatedAssignment = catchAsyncError(async (request, response, next) => {
    const { user } = request;
    if (!user) return next(new ErrorHandler(401, 'Unauthenticated'));

    const assignmentResult = await AssignmentService.getAssignments(user.registerNo);
    if (!assignmentResult) return next(new ErrorHandler(400, 'Unable to get Assignments'));

    successResponse(response, 200, assignmentResult);
});

export const getAllAssignment = catchAsyncError(async (request, response, next) => {
    const assignments = await AssignmentService.getAllAssignment(request.query);
    console.log(assignments);
    if (!assignments) return next(new ErrorHandler(400, 'Unable to get Assignments'));

    successResponse(response, 200, assignments);
});

export const getAssignments = catchAsyncError(async (request: Request<{ registerNo: string }>, response, next) => {
    const assignmentResult = await AssignmentService.getAssignments(parseInt(request.params.registerNo));
    if (!assignmentResult) return next(new ErrorHandler(400, 'Unable to get Assignments'));
    successResponse(response, 200, assignmentResult);
});
