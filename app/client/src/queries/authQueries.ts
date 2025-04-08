import { checkIsAuthenticated, loginUserByPassword, loginUserByQrCode, logoutUser } from '@api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLoginByPassword = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ path, loginData }: { path: string; loginData: { email: string; password: string } }) =>
            loginUserByPassword(path, loginData),
        onSuccess: (data) => {
            navigate(data.redirectUrl);
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
        },
    });
};

export const useLoginByQr = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ path, qrToken }: { path: string; qrToken: string }) => loginUserByQrCode(path, qrToken),
        onSuccess: (data) => {
            navigate(data.redirectUrl);
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
        },
    });
};

export const useLogout = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            navigate('/');
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
        },
    });
};

export const useIsAuthenticated = () => {
    return useQuery({
        queryKey: ['isAuthenticated'],
        queryFn: checkIsAuthenticated,
    });
};
