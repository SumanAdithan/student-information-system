import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { loginRoutes } from './LoginRoutes';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<h1>hello world</h1>} />
            {loginRoutes()}
        </>
    )
);

export const AppRoutes = () => <RouterProvider router={router} />;
