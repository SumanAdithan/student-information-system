import { LoginPage } from '@pages';
import { Route } from 'react-router-dom';

export const loginRoutes = () => <Route path='/' element={<LoginPage />} />;
