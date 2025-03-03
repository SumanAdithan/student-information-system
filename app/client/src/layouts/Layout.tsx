import { Header, Main, Sidebar } from '@layouts';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

export const Layout = () => {
    const [isMenuBtnVisible, setIsMenuBtnVisible] = useState(false);

    const showMenuBtn = useMediaQuery({ minWidth: 1280 });

    useEffect(() => {
        setIsMenuBtnVisible(!showMenuBtn);
    }, [showMenuBtn]);

    return (
        <div className='flex h-screen overflow-hidden font-primary text-font-primary'>
            <Sidebar />
            <div className='flex-1 relative overflow-auto scroll-smooth'>
                <Header isMenuBtnVisible={isMenuBtnVisible} />
                <Main>
                    <Outlet />
                </Main>
            </div>
        </div>
    );
};
