import { AssignmentDocument, getAllAssignmentData, getAssignmentDataByRegisterNo } from '@models';
import { AssignmentResult, QueryParams } from '@sis/types';
import { ApiFeatues } from '@utils';

export class AssignmentService {
    static async getAssignments(registerNo: number) {
        return getAssignmentDataByRegisterNo(registerNo);
    }

    static async getAllAssignment(queryStr: QueryParams) {
        let query = getAllAssignmentData();
        const filteredAssignments = new ApiFeatues<AssignmentDocument>(query, queryStr)
            .filterByYear()
            .filterByStatus()
            .exec();

        return filteredAssignments;
    }
}
