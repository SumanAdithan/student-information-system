import { Route } from 'react-router-dom';
import { Layout } from '@layouts';
import { PrivateRoute } from './ProtectedRoute';
import { FacultyAssignmentPage, FacultyOverviewPage, FacultyStudentPage } from '@pages';

export const facultyRoutes = () => {
    return (
        <Route element={<PrivateRoute allowedRoles={'faculty'} />}>
            <Route path='/faculty' element={<Layout />}>
                <Route index element={<FacultyOverviewPage />} />
                <Route path='students' element={<FacultyStudentPage />} />
                <Route path='assignments' element={<FacultyAssignmentPage />} />
            </Route>
        </Route>
    );
};
