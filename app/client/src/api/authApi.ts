import { api } from './apiClient';

export const loginUserByPassword = async (path: string, loginData: { email: string; password: string }) => {
    const { data } = await api.post(`/login/${path}`, loginData);
    return data;
};

export const loginUserByQrCode = async (path: string, qrToken: string) => {
    const { data } = await api.post(`/login/qr/${path}`, { qrToken });
    return data;
};

export const logoutUser = async () => {
    await api.post('/logout');
};
