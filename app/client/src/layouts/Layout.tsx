import { Header, Main, Sidebar } from '@layouts';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

export const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMenuBtnVisible, setIsMenuBtnVisible] = useState(false);

    const showMenuBtn = useMediaQuery({ minWidth: 1280 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        setIsSidebarOpen(!isMobile);
        setIsMenuBtnVisible(!showMenuBtn);
    }, [isMobile, showMenuBtn]);

    return (
        <div className='flex h-screen overflow-hidden font-primary text-font-primary'>
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
            <div className='flex-1 relative overflow-auto scroll-smooth'>
                <Header isMenuBtnVisible={isMenuBtnVisible} setIsSidebarOpen={setIsSidebarOpen} />
                <Main>
                    <Outlet />
                </Main>
            </div>
        </div>
    );
};
