import { catchAsyncError } from '@middlewares';
import { StatisticsService } from '@services';
import { successResponse } from '@utils';

export const getDuesStatistics = catchAsyncError(async (request, response, next) => {
    const duesStat = await StatisticsService.duesStatistics();
    successResponse(response, 200, duesStat);
});

export const getInternalResultStatistics = catchAsyncError(async (request, response, next) => {
    const internalStat = await StatisticsService.internalResultStatistics();
    successResponse(response, 200, internalStat);
});
