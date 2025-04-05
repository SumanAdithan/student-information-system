import { catchAsyncError } from '@middlewares';
import { AssignmentService } from '@services';
import { AssignmentResultDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';

export const getAuthenticatedAssignment = catchAsyncError(async (request, response, next) => {
    const { user } = request;
    if (!user) return next(new ErrorHandler(401, 'Unauthenticated'));

    const assignmentResult = await AssignmentService.getAssignments(user.registerNo);
    if (!assignmentResult) return next(new ErrorHandler(400, 'Unable to get Assignments'));

    successResponse(response, 200, assignmentResult);
});

export const getAllAssignment = catchAsyncError(async (request, response, next) => {
    const assignments = await AssignmentService.getAllAssignment(request.query);
    if (!assignments) return next(new ErrorHandler(400, 'Unable to get Assignments'));

    successResponse(response, 200, assignments);
});

export const getAssignments = catchAsyncError(async (request: Request<{ registerNo: string }>, response, next) => {
    const assignmentResult = await AssignmentService.getAssignments(parseInt(request.params.registerNo));
    if (!assignmentResult) return next(new ErrorHandler(400, 'Unable to get Assignments'));
    successResponse(response, 200, assignmentResult);
});

export const updateAssignment = catchAsyncError(
    async (request: Request<{}, {}, AssignmentResultDto>, response, next) => {
        const assignment = request.body;
        const { registerNo, result, code, mark } = assignment;
        await AssignmentService.updateAssignment(registerNo, result, code, mark);
        successResponse(response, 200, '', 'assignment updated');
    }
);
