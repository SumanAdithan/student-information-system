import { getFilteredSemesterResult, getSemesterResultDataByRegisterNo, updateSemesterResultGrade } from '@models';
import { QueryParams } from '@sis/types';

export class SemesterResultService {
    static async getSemesterResults(registerNo: number) {
        return getSemesterResultDataByRegisterNo(registerNo);
    }

    static async getAllSemesterResult(queryStr: QueryParams) {
        const filteredAssignments = getFilteredSemesterResult(queryStr);

        return filteredAssignments;
    }

    static async updateSemesterResult(registerNo: number, result: string, code: string, grade: string) {
        return updateSemesterResultGrade(registerNo, result, code, grade);
    }
}
