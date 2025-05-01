import { catchAsyncError } from '@middlewares';
import { StudentTimetableService } from '@services';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';

export const getAuthenticatedStudentTimetable = catchAsyncError(async (request: Request, response, next) => {
    const { user } = request;

    const timetable = await StudentTimetableService.getAuthenticatedStudentTimetable(user.year);
    if (!timetable) return new ErrorHandler(400, 'Unable to get timetable');

    return successResponse(response, 200, timetable);
});

export const getAllStudentTimetable = catchAsyncError(async (request, response, next) => {
    const timetables = await StudentTimetableService.getAllStudentTimetable();
    if (!timetables) return new ErrorHandler(400, 'Unable to get timetables');

    return successResponse(response, 200, timetables);
});

export const updateStudentTimetable = catchAsyncError(async (request: Request<{ year: string }>, response, next) => {
    const { year } = request.params;
    const timetable = await StudentTimetableService.updateStudentTimetable(parseInt(year), request.body);
    return successResponse(response, 200);
});
