import { Navigate, Outlet } from 'react-router-dom';
import { Loading } from '@components';
import { useDispatch } from 'react-redux';
import { AppDispatch, setProfile } from '@store';
import { useEffect } from 'react';
import { useIsAuthenticated } from '@queries';

export const PrivateRoute = ({ allowedRoles }: { allowedRoles: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useIsAuthenticated();
    const { data: authData, isLoading } = isAuthenticated;

    useEffect(() => {
        if (authData?.profileData) {
            dispatch(setProfile(authData.profileData));
        }
    }, [authData, dispatch]);

    if (isLoading) return <Loading />;

    if (!authData?.isAuthenticated) return <Navigate to={authData?.redirectUrl || '/'} replace />;
    if (!allowedRoles.includes(authData.profileData.role))
        return <Navigate to={authData?.redirectUrl || '/'} replace />;

    return <Outlet />;
};

export const PublicRoute = () => {
    const isAuthenticated = useIsAuthenticated();
    const { data: authData, isLoading } = isAuthenticated;

    if (isLoading) return <Loading />;

    if (authData?.isAuthenticated) return <Navigate to={authData.redirectUrl} replace />;

    return <Outlet />;
};
