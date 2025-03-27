import { useMutation } from '@tanstack/react-query';
import { loginUserByPassword, loginUserByQrCode, logoutUser } from '@api';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const navigate = useNavigate();

    const loginByPassword = useMutation({
        mutationFn: ({ path, loginData }: { path: string; loginData: { email: string; password: string } }) =>
            loginUserByPassword(path, loginData),
        onSuccess: (data) => {
            navigate(data.redirectUrl);
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
        },
    });

    const loginByQr = useMutation({
        mutationFn: ({ path, qrToken }: { path: string; qrToken: string }) => loginUserByQrCode(path, qrToken),
        onSuccess: (data) => {
            navigate(data.redirectUrl);
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
        },
    });

    const logout = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            navigate('/');
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
        },
    });
    return { loginByPassword, loginByQr, logout };
};
