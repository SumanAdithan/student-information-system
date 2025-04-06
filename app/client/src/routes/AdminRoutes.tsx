import { Route } from 'react-router-dom';
import { Layout } from '@layouts';
import { PrivateRoute } from './ProtectedRoute';
import {
    FacultyAssignmentPage,
    FacultyDuesPage,
    FacultyInternalResultPage,
    FacultyOverviewPage,
    FacultySemesterResultPage,
    FacultyStudentPage,
} from '@pages';
import { ViewStudent } from '@components';

export const adminRoutes = () => {
    return (
        <Route element={<PrivateRoute allowedRoles={'admin'} />}>
            <Route path='/admin' element={<Layout />}>
                <Route index element={<FacultyOverviewPage />} />
                <Route path='students' element={<FacultyStudentPage />} />
                <Route path='students/view' element={<ViewStudent />} />
                <Route path='assignments' element={<FacultyAssignmentPage />} />
                <Route path='internal-results' element={<FacultyInternalResultPage />} />
                <Route path='semester-results' element={<FacultySemesterResultPage />} />
                <Route path='dues' element={<FacultyDuesPage />} />
            </Route>
        </Route>
    );
};
