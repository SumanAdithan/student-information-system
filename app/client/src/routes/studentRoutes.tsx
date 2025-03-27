import { Layout } from '@layouts';
import {
    AssignmentsPage,
    DownloadNotesPage,
    InternalResulsPage,
    OverviewPage,
    PayDuesPage,
    SemesterResultsPage,
} from '@pages';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './ProtectedRoute';

export const studentRoutes = () => {
    return (
        <Route element={<PrivateRoute allowedRoles={'student'} />}>
            <Route path='/student' element={<Layout />}>
                <Route index element={<OverviewPage />} />
                <Route path='assignments' element={<AssignmentsPage />} />
                <Route path='internal-results' element={<InternalResulsPage />} />
                <Route path='semester-results' element={<SemesterResultsPage />} />
                <Route path='download-notes' element={<DownloadNotesPage />} />
                <Route path='pay-dues' element={<PayDuesPage />} />
            </Route>
        </Route>
    );
};
