import { LoginPage } from '@pages';
import { Route } from 'react-router-dom';
import { PublicRoute } from './ProtectedRoute';

export const loginRoutes = () => (
    <Route element={<PublicRoute />}>
        <Route path='/' element={<LoginPage />} />;
    </Route>
);
