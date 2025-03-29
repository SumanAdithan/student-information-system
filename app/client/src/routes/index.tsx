import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { loginRoutes } from './loginRoutes';
import { studentRoutes } from './studentRoutes';
import { facultyRoutes } from './FacultyRoutes';
import { adminRoutes } from './AdminRoutes';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {loginRoutes()}
            {studentRoutes()}
            {facultyRoutes()}
            {adminRoutes()}
        </>
    )
);

export const AppRoutes = () => <RouterProvider router={router} />;
