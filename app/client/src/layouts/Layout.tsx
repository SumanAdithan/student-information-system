import { Header, Main, Sidebar } from '@layouts';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <Sidebar />
            <div>
                <Header />
                <Main>
                    <Outlet />
                </Main>
            </div>
        </div>
    );
};
