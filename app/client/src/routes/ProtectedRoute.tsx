import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '@utils';

export const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string }) => {
    const [authData, setAuthData] = useState<{ isAuthenticated: boolean; role: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/${allowedRoles}/auth/status`)
            .then((res) => {
                setAuthData(res.data);
                setLoading(false);
            })
            .catch(() => {
                setAuthData({ isAuthenticated: false, role: '' });
                setLoading(false);
            });
    }, []);

    if (loading) return <h1>Loading...</h1>;

    if (!authData?.isAuthenticated) return <Navigate to='/' />;
    if (!allowedRoles.includes(authData.role)) return <Navigate to='/' />;

    return <Outlet />;
};
