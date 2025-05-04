import { getDuesStatistics, getInternalResultStatistics } from '@models';

export class StatisticsService {
    static async duesStatistics() {
        return getDuesStatistics();
    }

    static async internalResultStatistics() {
        return getInternalResultStatistics();
    }
}
