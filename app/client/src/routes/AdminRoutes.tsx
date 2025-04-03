import { Route } from 'react-router-dom';
import { Layout } from '@layouts';
import { PrivateRoute } from './ProtectedRoute';
import { FacultyAssignmentPage, FacultyOverviewPage, FacultyStudentPage } from '@pages';
import { ViewStudent } from '@components';

export const adminRoutes = () => {
    return (
        <Route element={<PrivateRoute allowedRoles={'admin'} />}>
            <Route path='/admin' element={<Layout />}>
                <Route index element={<FacultyOverviewPage />} />
                <Route path='students' element={<FacultyStudentPage />} />
                <Route path='students/view' element={<ViewStudent />} />
                <Route path='assignments' element={<FacultyAssignmentPage />} />
            </Route>
        </Route>
    );
};
