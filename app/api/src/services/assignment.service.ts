import {
    AssignmentDocument,
    getAllAssignmentData,
    getAssignmentDataByRegisterNo,
    getFilteredAssignments,
    updateAssignmentDataMark,
} from '@models';
import { AssignmentResult, QueryParams } from '@sis/types';
import { ApiFeatues } from '@utils';

export class AssignmentService {
    static async getAssignments(registerNo: number) {
        return getAssignmentDataByRegisterNo(registerNo);
    }

    static async getAllAssignment(queryStr: QueryParams) {
        const filteredAssignments = getFilteredAssignments(queryStr);

        return filteredAssignments;
    }

    static async updateAssignment(registerNo: number, result: 'one' | 'two' | 'three', code: string, mark: number) {
        return updateAssignmentDataMark(registerNo, result, code, mark);
    }
}
