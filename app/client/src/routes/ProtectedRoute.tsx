import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '@utils';
import { Loading } from '@components';

export const PrivateRoute = ({ allowedRoles }: { allowedRoles: string }) => {
    const [authData, setAuthData] = useState<{ isAuthenticated: boolean; role: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/auth/status`)
            .then((res) => {
                setAuthData(res.data);
                setLoading(false);
            })
            .catch(() => {
                setAuthData({ isAuthenticated: false, role: '' });
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading />;

    if (!authData?.isAuthenticated) return <Navigate to='/' replace />;
    if (!allowedRoles.includes(authData.role)) return <Navigate to='/' replace />;

    return <Outlet />;
};

export const PublicRoute = () => {
    const [authData, setAuthData] = useState<{ isAuthenticated: boolean; role: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/auth/status`)
            .then((res) => {
                setAuthData(res.data);
                setLoading(false);
            })
            .catch(() => {
                setAuthData({ isAuthenticated: false, role: '' });
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading />;

    if (authData?.isAuthenticated) return <Navigate to={`/${authData.role}`} replace />;

    return <Outlet />;
};
