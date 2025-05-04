import { api } from './apiClient';

export const getDuesStat = async () => {
    const { data } = await api.get('/statistics/dues');
    return { dueStatistics: data.data };
};

export const getInternalResultStat = async () => {
    const { data } = await api.get('/statistics/internal-result');
    return { internalResultStatistics: data.data };
};
