import { Layout } from '@layouts';
import {
    AssignmentsPage,
    DownloadNotesPage,
    InternalResultPage,
    OverviewPage,
    DuesPage,
    SemesterResultPage,
    TimetablePage,
    DuesAndApprovalsPage,
} from '@pages';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './ProtectedRoute';

export const studentRoutes = () => {
    return (
        <Route element={<PrivateRoute allowedRoles={'student'} />}>
            <Route path='/student' element={<Layout />}>
                <Route index element={<OverviewPage />} />
                <Route path='assignments' element={<AssignmentsPage />} />
                <Route path='internal-results' element={<InternalResultPage />} />
                <Route path='semester-results' element={<SemesterResultPage />} />
                <Route path='download-notes' element={<DownloadNotesPage />} />
                <Route path='dues' element={<DuesPage />} />
                <Route path='approvals' element={<DuesAndApprovalsPage />} />
                <Route path='timetable' element={<TimetablePage />} />
            </Route>
        </Route>
    );
};
