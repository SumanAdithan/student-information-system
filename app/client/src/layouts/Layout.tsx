import { Header, Main, Sidebar } from '@layouts';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMenuBtnVisible, setSidebarOpen, setIsMobile, AppDispatch } from '@store';

export const Layout = () => {
    const dispatch = useDispatch<AppDispatch>();

    const showMenuBtn = useMediaQuery({ minWidth: 1280 });
    const mobileView = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        dispatch(setIsMobile(mobileView));
        dispatch(setSidebarOpen(!mobileView));
        dispatch(setMenuBtnVisible(!showMenuBtn));
    }, [mobileView, showMenuBtn, dispatch]);

    return (
        <div className='flex h-screen overflow-hidden font-primary text-font-primary'>
            <Sidebar />
            <div className='flex-1 relative overflow-auto scroll-smooth'>
                <Header />
                <Main>
                    <Outlet />
                </Main>
            </div>
        </div>
    );
};
