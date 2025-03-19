import { sidebarConfig } from '@constants';
import { ExpandableSidebar } from '@ui';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
    isMobile: boolean;
}

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isMobile }: SidebarProps) => {
    const { logo, title, menuItems } = sidebarConfig;

    const renderNavigationLinks = () => {
        return (
            <nav className='mt-6 px-4 grow'>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        end
                        className={({ isActive }) =>
                            `flex items-center text-lg font-medium p-4 mb-2 rounded-xl transition-colors duration-300 ${
                                isActive
                                    ? 'bg-primary text-font-primary'
                                    : 'hover:bg-primary hover:text-font-primary text-font-secondary'
                            }`
                        }
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
                ))}
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
                        <X size={28} className='text-font-primary' onClick={() => setIsSidebarOpen((prev) => !prev)} />
                    )}
                </div>
                <div className='overflow-y-auto'>{renderNavigationLinks()}</div>
            </div>
        </ExpandableSidebar>
    );
};
