import { Route } from 'react-router-dom';
import { Layout } from '@layouts';
import { PrivateRoute } from './ProtectedRoute';
import {
    CircularPage,
    DownloadNotesPage,
    EventPage,
    FacultyAssignmentPage,
    FacultyDuesAndApprovalsPage,
    FacultyDuesPage,
    FacultyInternalResultPage,
    FacultyOverviewPage,
    FacultySemesterResultPage,
    FacultyStudentPage,
    FacultyTimetablePage,
} from '@pages';

export const facultyRoutes = () => {
    return (
        <Route element={<PrivateRoute allowedRoles={'faculty'} />}>
            <Route path='/faculty' element={<Layout />}>
                <Route index element={<FacultyOverviewPage />} />
                <Route path='students' element={<FacultyStudentPage />} />
                <Route path='assignments' element={<FacultyAssignmentPage />} />
                <Route path='internal-results' element={<FacultyInternalResultPage />} />
                <Route path='semester-results' element={<FacultySemesterResultPage />} />
                <Route path='download-notes' element={<DownloadNotesPage />} />
                <Route path='dues' element={<FacultyDuesPage />} />
                <Route path='approvals' element={<FacultyDuesAndApprovalsPage />} />
                <Route path='timetable' element={<FacultyTimetablePage />} />
                <Route path='circulars' element={<CircularPage />} />
                <Route path='events' element={<EventPage />} />
            </Route>
        </Route>
    );
};
