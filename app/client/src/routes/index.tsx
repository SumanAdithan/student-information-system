import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { loginRoutes } from './loginRoutes';
import { studentRoutes } from './studentRoutes';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {loginRoutes()}
            {studentRoutes()}
        </>
    )
);

export const AppRoutes = () => <RouterProvider router={router} />;
