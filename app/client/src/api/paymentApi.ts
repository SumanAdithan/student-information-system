import { PayDuesSchemaType, PaymentResponse } from '@sis/types';
import { api } from './apiClient';

export const getPaymentKey = async () => {
    const { data } = await api.get('/payment/key');
    return data.data;
};

export const processPayment = async (orderData: PayDuesSchemaType) => {
    const { data } = await api.post('/payment/process', orderData);
    return data.data;
};

export const verifyPayment = async (paymentResponse: PaymentResponse) => {
    return await api.post('/payment/verify', paymentResponse);
};
