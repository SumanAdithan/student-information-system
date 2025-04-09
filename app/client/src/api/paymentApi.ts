import { api } from './apiClient';

export const getPaymentKey = async () => {
    const { data } = await api.get('/payment/key');
    return data.data;
};
