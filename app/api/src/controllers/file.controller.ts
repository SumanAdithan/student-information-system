import { catchAsyncError } from '@middlewares';
import { ErrorHandler } from '@utils';
import { Request } from 'express';
import { AwsService } from 'services/aws.service';

const awsService = new AwsService();

export const getFile = (folder: 'students' | 'notes') =>
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
