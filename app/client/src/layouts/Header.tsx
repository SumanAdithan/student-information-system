import { LazyImage } from '@components';
import { headerConfig } from '@constants';
import { useLogout } from '@queries';
import { AppDispatch, RootState, toggleSidebarOpen } from '@store';
import { getTitle } from '@utils';
import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isMenuBtnVisible } = useSelector((state: RootState) => state.layout);
    const { profileImage, name, role } = useSelector((state: RootState) => state.profile);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [title, setTitle] = useState('');

    const profileRef = useRef<HTMLDivElement>(null);
    const logoutMutation = useLogout();

    const { pathname } = useLocation();
    const { studentHeaderTitles, facultyHeaderTitles, adminHeaderTitles, dropDownItems } = headerConfig;

    const headerTitles =
        role === 'student'
            ? studentHeaderTitles
            : role === 'faculty'
            ? facultyHeaderTitles
            : role === 'admin'
            ? adminHeaderTitles
            : {};

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!profileRef.current?.contains(e.target as Node)) setIsDropDownOpen(false);
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        setTitle(getTitle(pathname, headerTitles));
    }, [pathname, role]);

    return (
        <div className='relative md:z-20 bg-background shadow-header'>
            <div className='relative flex items-center justify-between max-w-7xl mx-auto px-4 py-3 xs:py-2 sm:px-6 lg:px-8 '>
                <div className='flex items-center gap-2'>
                    {isMenuBtnVisible && (
                        <Menu
                            size={34}
                            className='bg-primary text-white rounded-sm'
                            onClick={() => dispatch(toggleSidebarOpen())}
                        />
                    )}
                    <h1 className='text-lg xs:text-2xl font-semibold'>{title}</h1>
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <div
                            className='w-10 h-10 xs:w-12 xs:h-12 rounded-full overflow-hidden'
                            onClick={() => setIsDropDownOpen((prev) => !prev)}
                            ref={profileRef}
                        >
                            <LazyImage image={profileImage} name='profile' className='w-full h-full object-cover' />
                        </div>
                        <h2 className='font-medium'>{name}</h2>
                    </div>
                    {isDropDownOpen && (
                        <div className='absolute right-0 top-16 w-48 rounded-b-md bg-background shadow-lg z-20 overflow-hidden'>
                            {dropDownItems.map((item, i) => (
                                <button
                                    className='block px-4 py-2 text-sm  text-font-primary hover:bg-gray-200 w-full text-left'
                                    key={i}
                                    onClick={() => item.action(logoutMutation.mutate())}
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
