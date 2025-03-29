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

export const checkIsAuthenticated = async () => {
    try {
        const { data } = await api.get('/auth/status');
        return {
            isAuthenticated: data.data.isAuthenticated,
            role: data.data.role,
            redirectUrl: data.redirectUrl || '/',
        };
    } catch (err) {
        return {
            isAuthenticated: false,
            role: '',
            redirectUrl: '/',
        };
    }
};
