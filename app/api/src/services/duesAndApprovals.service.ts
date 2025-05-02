import {
    getAuthenticatedDuesAndApprovalsData,
    getDuesAndApprovalsByRegisterNo,
    getFilteredDuesAndApprovals,
    updateDuesAndApprovalsData,
} from '@models';
import { QueryParams, UpdateDuesAndApprovalsDto } from '@sis/types';

export class DuesAndApprovalsService {
    static async getAuthenticatedDuesAndApprovals(registerNo: number) {
        return getAuthenticatedDuesAndApprovalsData(registerNo);
    }

    static async getAllDuesAndApprovals(queryStr: QueryParams) {
        return getFilteredDuesAndApprovals(queryStr);
    }

    static async getDuesAndApprovals(registerNo: number) {
        return getDuesAndApprovalsByRegisterNo(registerNo);
    }

    static async updateDuesAndApprovals(registerNo: number, updatedItems: UpdateDuesAndApprovalsDto) {
        return updateDuesAndApprovalsData(registerNo, updatedItems);
    }
}
