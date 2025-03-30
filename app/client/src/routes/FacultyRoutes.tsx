import { Route } from 'react-router-dom';
import { Layout } from '@layouts';
import { PrivateRoute } from './ProtectedRoute';
import { FacultyOverviewPage, FacultyStudentPage } from '@pages';
import { ViewStudent } from '@components';

export const facultyRoutes = () => {
    return (
        <Route element={<PrivateRoute allowedRoles={'faculty'} />}>
            <Route path='/faculty' element={<Layout />}>
                <Route index element={<FacultyOverviewPage />} />
                <Route path='students' element={<FacultyStudentPage />} />
                <Route path='students/view' element={<ViewStudent />} />
            </Route>
        </Route>
    );
};
