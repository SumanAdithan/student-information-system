import { adminUpdateDuesData, getDuesDataByRegisterNo, getFilteredDuesData, updateDuesData } from '@models';
import { QueryParams, UpdateDues } from '@sis/types';

export class DuesService {
    static getDues(registerNo: number) {
        return getDuesDataByRegisterNo(registerNo);
    }

    static getAllDues(queryStr: QueryParams) {
        const filteredDuesData = getFilteredDuesData(queryStr);

        return filteredDuesData;
    }

    static updateDues(dues: UpdateDues) {
        return adminUpdateDuesData(dues);
    }
}
