import { getDuesDataByRegisterNo, getFilteredDuesData, updateDuesData } from '@models';
import { QueryParams } from '@sis/types';

export class DuesService {
    static getDues(registerNo: number) {
        return getDuesDataByRegisterNo(registerNo);
    }

    static getAllDues(queryStr: QueryParams) {
        const filteredDuesData = getFilteredDuesData(queryStr);

        return filteredDuesData;
    }

    static updateDues(registerNo: number, category: string, amount: number) {
        return updateDuesData(registerNo, category, amount);
    }
}
