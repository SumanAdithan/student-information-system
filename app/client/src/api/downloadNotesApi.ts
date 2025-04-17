import { api } from './apiClient';

export const getAllNotesData = async () => {
    const { data } = await api.get('/notes');
    return {
        notes: data.data,
    };
};
