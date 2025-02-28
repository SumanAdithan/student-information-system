import { Layout } from '@layouts';
import { AssignmentsPage, OverviewPage } from '@pages';
import { Route } from 'react-router-dom';

export const studentRoutes = () => {
    return (
        <Route path='/student' element={<Layout />}>
            <Route index element={<OverviewPage />} />
            <Route path='assignments' element={<AssignmentsPage />} />
        </Route>
    );
};
