import { catchAsyncError } from '@middlewares';
import { createStudentTimetableData } from '@models';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';
import { AwsService } from 'services/aws.service';

const awsService = new AwsService();

export const getFile = (folder: 'students' | 'notes' | 'circular') =>
    catchAsyncError(async (request: Request<{ fileName: string }>, response, next) => {
        const { fileName } = request.params;

        const dispositionType = folder === 'notes' ? 'attachment' : 'inline';
        const streamFile = await awsService.streamFile(folder, fileName, response, dispositionType);
        if (!streamFile.success) return next(new ErrorHandler(400, 'File not found'));
    });

export const getAuthenticatedProfileImage = catchAsyncError(async (request, response, next) => {
    const { profileImage } = request.user;

    const dispositionType = 'inline';
    const streamFile = await awsService.streamFile('students', profileImage, response, dispositionType);
    if (!streamFile.success) return next(new ErrorHandler(400, 'File not found'));
});

export const createTimetable = catchAsyncError(async (request, response, next) => {
    const timetable = await createStudentTimetableData(request.body);

    return successResponse(response, 200, timetable);
});
