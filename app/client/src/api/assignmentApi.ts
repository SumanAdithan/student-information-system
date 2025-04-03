import { api } from './apiClient';

const resultTitles = ['First Assignment', 'Second Assignment', 'Third Assignment'];

export const getAuthenticatedAssignment = async () => {
    const { data } = await api.get('/student/assignment');
    return {
        resultTitles: resultTitles,
        assignmentResult: data.data,
    };
};

export const getAllAssignmentData = async () => {
    const { data } = await api.get('/assignments');
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
