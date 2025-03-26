import { headerConfig } from '@constants';
import { Menu } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
    isMenuBtnVisible: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ isMenuBtnVisible, setIsSidebarOpen }: HeaderProps) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [title, setTitle] = useState('');
    const profileRef = useRef<HTMLDivElement>(null);

    const { pathname } = useLocation();
    const { headerTitles, name, profileImage, dropDownItems } = headerConfig;

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!profileRef.current?.contains(e.target as Node)) setIsDropDownOpen(false);
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [profileRef]);

    useEffect(() => {
        setTitle(headerTitles[pathname as keyof typeof headerTitles]);
    }, []);
    return (
        <div className='relative md:z-20 bg-background shadow-header'>
            <div className='relative flex items-center justify-between max-w-7xl mx-auto px-4 py-3 xs:py-2 sm:px-6 lg:px-8'>
                <div className='flex items-center gap-2'>
                    {isMenuBtnVisible && (
                        <Menu
                            size={34}
                            className='bg-primary text-white rounded-sm'
                            onClick={() => setIsSidebarOpen((prev) => !prev)}
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
                            <img src={profileImage} alt='profile' />
                        </div>
                        <h2 className='font-medium'>{name}</h2>
                    </div>
                    {isDropDownOpen && (
                        <div className='absolute right-0 top-16 w-48 rounded-b-md bg-background shadow-lg z-20'>
                            {dropDownItems.map((item, i) => (
                                <button
                                    className='block px-4 py-2 text-sm text-font-primary hover:bg-gray-200 w-full text-left'
                                    key={i}
                                    onClick={() => console.log(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
