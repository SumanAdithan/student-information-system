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

export const studentRoutes = () => {
    return (
        <Route path='/student' element={<Layout />}>
            <Route index element={<OverviewPage />} />
            <Route path='assignments' element={<AssignmentsPage />} />
            <Route path='internal-results' element={<InternalResulsPage />} />
            <Route path='semester-results' element={<SemesterResultsPage />} />
            <Route path='download-notes' element={<DownloadNotesPage />} />
            <Route path='pay-dues' element={<PayDuesPage />} />
        </Route>
    );
};
