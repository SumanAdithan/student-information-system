import { getFilteredInternalResult, getInternalResultDataByRegisterNo, updateInternalResultMark } from '@models';
import { QueryParams } from '@sis/types';

export class InternalResultService {
    static async getInternalResults(registerNo: number) {
        return getInternalResultDataByRegisterNo(registerNo);
    }

    static async getAllInternalResult(queryStr: QueryParams) {
        const filteredAssignments = getFilteredInternalResult(queryStr);

        return filteredAssignments;
    }

    static async updateInternalResult(registerNo: number, result: string, code: string, mark: number) {
        return updateInternalResultMark(registerNo, result, code, mark);
    }
}
