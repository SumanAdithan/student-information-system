import { catchAsyncError } from '@middlewares';
import { SemesterResultService } from '@services';
import { SemesterResultDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';

export const getAuthenticatedSemesterResult = catchAsyncError(async (request, response, next) => {
    const { user } = request;
    if (!user) return next(new ErrorHandler(401, 'Unauthenticated'));

    const semesterResult = await SemesterResultService.getSemesterResults(user.registerNo);
    if (!semesterResult) return next(new ErrorHandler(400, 'Unable to get Semester Result'));

    successResponse(response, 200, semesterResult);
});

export const getAllSemesterResult = catchAsyncError(async (request, response, next) => {
    const semesterResults = await SemesterResultService.getAllSemesterResult(request.query);
    if (!semesterResults) return next(new ErrorHandler(400, 'Unable to get Semester Result'));

    successResponse(response, 200, semesterResults);
});

export const getSemesterResults = catchAsyncError(async (request: Request<{ registerNo: string }>, response, next) => {
    const semesterResults = await SemesterResultService.getSemesterResults(parseInt(request.params.registerNo));
    if (!semesterResults) return next(new ErrorHandler(400, 'Unable to get Semester Result'));
    successResponse(response, 200, semesterResults);
});

export const updateSemesterResult = catchAsyncError(
    async (request: Request<{}, {}, SemesterResultDto>, response, next) => {
        const semesterResult = request.body;
        const { registerNo, result, code, grade } = semesterResult;
        await SemesterResultService.updateSemesterResult(registerNo, result, code, grade);
        successResponse(response, 200, '', 'Semester Result updated');
    }
);
