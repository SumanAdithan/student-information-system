import { QueryParams, UpdateSemesterResult } from '@sis/types';
import { api } from './apiClient';
import qs from 'qs';

const resultTitles = [
    'First Semester Examination',
    'Second Semester Examination',
    'Third Semester Examination',
    'Fourth Semester',
    'Fifth Semester',
    'Sixth Semester',
    'Seventh Semester',
    'eighth Semester',
];

export const getAuthenticatedSemesterResult = async () => {
    const { data } = await api.get('/student/semester-results');
    return {
        resultTitles: resultTitles,
        semesterResult: data.data,
    };
};

export const getAllSemesterResultData = async (params: QueryParams) => {
    const query = qs.stringify(params, { skipNulls: true });
    const { data } = await api.get(`/semester-results?${query}`);

    return {
        semesterResults: data.data,
    };
};

export const getSemesterResultData = async (registerNo: number) => {
    const { data } = await api.get(`/semester-results/${registerNo}`);
    return {
        resultTitles: resultTitles,
        semesterResult: data.data,
    };
};

export const updateSemesterResultData = async (semesterResultData: UpdateSemesterResult) => {
    return api.patch('/semester-results', semesterResultData);
};
