import qs from 'qs';
import { api } from './apiClient';
import { Dues, PayDuesSchemaType, QueryParams, RazorpayResponse, UpdateDues } from '@sis/types';

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
        amounts: {
            tuition_fee: dues_details.tuition_fee.total,
            bus_fee: dues_details.bus_fee.total,
            stationary_fee: dues_details.stationary_fee.total,
            sports_placement_fee: dues_details.sports_placement_fee.total,
            apparel_fee: dues_details.apparel_fee.total,
            examination_fee: dues_details.examination_fee.total,
            fine: dues_details.fine.total,
        },
    };
};

export const updateDuesData = async (duesData: UpdateDues) => {
    return api.patch('/dues', duesData);
};

export const processDuesPayment = async (orderData: PayDuesSchemaType) => {
    const { data } = await api.post('/dues/online-payment/process', orderData);
    return data.data;
};

export const verifyDuesPayment = async (RazorpayResponse: RazorpayResponse): Promise<{ dues: Dues }> => {
    const { data } = await api.post('/dues/online-payment/verify', RazorpayResponse);
    return { dues: data.data };
};

export const processPendingPayment = async (orderData: PayDuesSchemaType) => {
    const { data } = await api.post('/dues/pending/online-payment/process', orderData);
    return data.data;
};

export const verifyPendingPayment = async (RazorpayResponse: RazorpayResponse): Promise<{ dues: Dues }> => {
    const { data } = await api.post('/dues/pending/online-payment/verify', RazorpayResponse);
    return { dues: data.data };
};

export const updateOfflineDuesPayment = async (duesData: PayDuesSchemaType) => {
    const { data } = await api.patch('/dues/offline-payment', duesData);
    return {
        dues: data.data,
    };
};

export const updateOfflinePendingPayment = async (duesData: PayDuesSchemaType) => {
    const { data } = await api.patch('/dues/pending/offline-payment', duesData);
    return {
        dues: data.data,
    };
};

export const resetDues = async (registerNo: number) => {
    const { data } = await api.post(`/dues/reset/${registerNo}`);
    return {
        dues: data.data,
    };
};
