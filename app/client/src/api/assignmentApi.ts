import { QueryParams, UpdateAssignmentResult } from '@sis/types';
import { api } from './apiClient';
import qs from 'qs';

const resultTitles = ['First Assignment', 'Second Assignment', 'Third Assignment'];

export const getAuthenticatedAssignment = async () => {
    const { data } = await api.get('/student/assignment');
    return {
        resultTitles: resultTitles,
        assignmentResult: data.data,
    };
};

export const getAllAssignmentData = async (params: QueryParams) => {
    const query = qs.stringify(params, { skipNulls: true });
    const { data } = await api.get(`/assignments?${query}`);

    return {
        assignments: data.data,
    };
};

export const getAssignmentData = async (registerNo: number) => {
    const { data } = await api.get(`/assignments/${registerNo}`);
    return {
        resultTitles: resultTitles,
        assignmentResult: data.data,
    };
};

export const updateAssignmentData = async (assignmentData: UpdateAssignmentResult) => {
    return api.patch('/assignments', assignmentData);
};
