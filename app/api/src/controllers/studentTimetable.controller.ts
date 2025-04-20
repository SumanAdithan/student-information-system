import { catchAsyncError } from '@middlewares';
import { StudentTimetableService } from '@services';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';

export const getAuthenticatedStudentTimetable = catchAsyncError(async (request: Request, response, next) => {
    const { user } = request;

    const timeTable = await StudentTimetableService.getAuthenticatedStudentTimetable(user.year);
    if (!timeTable) return new ErrorHandler(400, 'Unable to get timetable');

    return successResponse(response, 200, timeTable);
});
