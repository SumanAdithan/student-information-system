import { sidebarConfig } from '@constants';
import { AppDispatch, closeView, RootState, toggleSidebarOpen } from '@store';
import { ExpandableSidebar } from '@ui';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

export const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isSidebarOpen, isMobile } = useSelector((state: RootState) => state.layout);
    const { role } = useSelector((state: RootState) => state.profile);
    const { logo, title, studentNavLinks, facultyNavLinks, adminNavLinks } = sidebarConfig;

    const navLinks =
        role === 'student'
            ? studentNavLinks
            : role === 'faculty'
            ? facultyNavLinks
            : role === 'admin'
            ? adminNavLinks
            : [];
    const { pathname } = useLocation();

    // Function to check if a link should be active
    const isNavLinkActive = (href: string, pathname: string): boolean => {
        if (pathname === href) return true;
        if (pathname.startsWith(href) && !pathname.replace(href, '').includes('/')) return true;
        if (pathname === `${href}/view`) return true;
        return false;
    };

    const renderNavigationLinks = () => {
        return (
            <nav className='mt-6 px-4 grow'>
                {navLinks.map((item) => {
                    const shouldBeActive = isNavLinkActive(item.href, pathname);
                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={`flex items-center text-lg font-medium p-4 mb-2 rounded-xl transition-colors duration-300 ${
                                shouldBeActive
                                    ? 'bg-primary text-font-primary'
                                    : 'hover:bg-primary hover:text-font-primary text-font-secondary'
                            }`}
                            onClick={() => dispatch(closeView())}
                        >
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        className='text-nowrap'
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2, delay: 0.3 }}
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    );
                })}
            </nav>
        );
    };

    return (
        <ExpandableSidebar isMobile={isMobile} isSidebarOpen={isSidebarOpen}>
            <div className='h-full bg-white py-4 flex flex-col shadow-sidebar'>
                <div className='flex items-center'>
                    <div className='flex items-center gap-2 px-4 py-2'>
                        <div className='w-14 h-14 flex-shrink-0'>
                            <img src={logo} alt={title} />
                        </div>
                        <h1 className='text-3xl font-medium'>{title}</h1>
                    </div>
                    {isMobile && (
                        <X size={28} className='text-font-primary' onClick={() => dispatch(toggleSidebarOpen())} />
                    )}
                </div>
                <div className='overflow-y-auto'>{renderNavigationLinks()}</div>
            </div>
        </ExpandableSidebar>
    );
};
