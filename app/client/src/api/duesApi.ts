import qs from 'qs';
import { api } from './apiClient';
import { QueryParams, UpdateDues } from '@sis/types';

export const getAuthenticatedDues = async () => {
    const { data } = await api.get('/student/dues');
    return {
        dues: data.data,
    };
};

export const getAllDuesData = async (params: QueryParams) => {
    const query = qs.stringify(params, { skipNulls: true });
    const { data } = await api.get(`/dues?${query}`);

    return {
        dues: data.data,
    };
};

export const getDuesData = async (registerNo: number, isEdit: boolean) => {
    const { data } = await api.get(`/dues/${registerNo}`);
    const { name, year, dues_details, registerNo: regNo } = data.data;

    if (!isEdit) return data.data;

    return {
        name,
        year,
        registerNo: regNo,
        tuition_fee: dues_details.tuition_fee.total,
        bus_fee: dues_details.bus_fee.total,
        stationary_fee: dues_details.stationary_fee.total,
        sports_placement_fee: dues_details.sports_placement_fee.total,
        apparel_fee: dues_details.apparel_fee.total,
        examination_fee: dues_details.examination_fee.total,
        fine: dues_details.fine.total,
    };
};

export const updateDuesData = async (duesData: UpdateDues) => {
    return api.patch('/dues', duesData);
};
