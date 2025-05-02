import { DuesAndApprovals, QueryParams } from '@sis/types';
import { api } from './apiClient';
import qs from 'qs';

export const getAuthenticatedDuesAndApprovals = async () => {
    const { data } = await api.get('/student/dues-and-approvals');
    return {
        duesAndApprovals: data.data,
    };
};

export const getAllDuesAndApprovalsData = async (params: QueryParams) => {
    console.log(params);
    const query = qs.stringify(params, { skipNulls: true });
    const { data } = await api.get(`/dues-and-approvals?${query}`);
    return {
        duesAndApprovals: data.data,
    };
};

export const getDuesAndApprovalsData = async (registerNo: number) => {
    const { data } = await api.get(`/dues-and-approvals/${registerNo}`);
    return {
        duesAndApprovals: data.data,
    };
};

export const updateDuesAndApprovalsData = async ({
    registerNo,
    updatedData,
}: {
    registerNo: number;
    updatedData: DuesAndApprovals;
}) => {
    return await api.patch(`/dues-and-approvals/${registerNo}`, updatedData);
};
