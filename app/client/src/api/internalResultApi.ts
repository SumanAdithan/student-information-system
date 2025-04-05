import { UpdateInternalResult } from '@sis/types';
import { api } from './apiClient';
import qs from 'qs';

const resultTitles = [
    'First Internal Examination',
    'Second Internal Examination',
    'Third Internal Examination',
    'Sem Internal Marks',
];

export const getAuthenticatedInternalResult = async () => {
    const { data } = await api.get('/student/internal-results');
    return {
        resultTitles: resultTitles,
        internalResult: data.data,
    };
};

export const getAllInternalResultData = async (params: { year: string; status: string; result: string }) => {
    const query = qs.stringify(params, { skipNulls: true });
    const { data } = await api.get(`/internal-results?${query}`);

    return {
        internalResults: data.data,
    };
};

export const getInternalResultData = async (registerNo: number) => {
    const { data } = await api.get(`/internal-results/${registerNo}`);
    return {
        resultTitles: resultTitles,
        internalResult: data.data,
    };
};

export const updateInternalResultData = async (internalResultData: UpdateInternalResult) => {
    return api.patch('/internal-results', internalResultData);
};
