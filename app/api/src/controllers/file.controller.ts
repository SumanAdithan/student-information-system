import { catchAsyncError } from '@middlewares';
import { ErrorHandler } from '@utils';
import { Request } from 'express';
import { AwsService } from 'services/aws.service';

export const getFile = catchAsyncError(
    async (request: Request<{ folder: string; fileName: string }>, response, next) => {
        const awsService = new AwsService();
        const { folder, fileName } = request.params;

        const streamFile = await awsService.streamFile(folder, fileName, response);
        if (!streamFile.success) return next(new ErrorHandler(400, 'File not found'));
    }
);
