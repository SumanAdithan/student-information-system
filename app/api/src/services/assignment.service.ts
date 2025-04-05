import { getAssignmentDataByRegisterNo, getFilteredAssignments, updateAssignmentDataMark } from '@models';
import { AssignmentResult, QueryParams } from '@sis/types';

export class AssignmentService {
    static async getAssignments(registerNo: number) {
        return getAssignmentDataByRegisterNo(registerNo);
    }

    static async getAllAssignment(queryStr: QueryParams) {
        const filteredAssignments = getFilteredAssignments(queryStr);

        return filteredAssignments;
    }

    static async updateAssignment(registerNo: number, result: string, code: string, mark: number) {
        return updateAssignmentDataMark(registerNo, result, code, mark);
    }
}
