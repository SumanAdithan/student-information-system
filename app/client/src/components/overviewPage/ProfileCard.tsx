import { LazyImage } from '@components';
import { RootState } from '@store';
import { SlideUp } from '@ui';
import { useSelector } from 'react-redux';
const apiUrl = import.meta.env.VITE_API_URL;

interface ProfileCardProps {
    name: string;
    profileImage: string;
    regNo: number;
}

const profileCardConfig = {
    title: 'Your Profile',
};

export const ProfileCard = ({ name, profileImage, regNo }: ProfileCardProps) => {
    const { role } = useSelector((state: RootState) => state.profile);

    const profileUrl = role === 'student' ? `${apiUrl}/profile-image` : `${apiUrl}/file/students/${profileImage}`;

    const { title } = profileCardConfig;
    return (
        <SlideUp
            className='bg-white p-6 rounded-t-2xl xl:rounded-2xl xl:w-1/2  xl:shadow-section'
            initial={25}
            duration={0.5}
            delay={0.2}
        >
            <h1 className='text-2xl font-medium mb-10 xl:mb-0'>{title}</h1>
            <div className='h-full flex flex-col justify-center items-center gap-5'>
                <div className='w-40 h-40  sm:w-56 sm:h-56 rounded-full overflow-hidden'>
                    <LazyImage image={profileUrl} name='profile' className='w-full h-full object-cover' />
                </div>
                <div className='text-lg sm:text-xl  font-medium'>
                    <h2 className='text-center'>{name}</h2>
                    <p className='text-center'>{regNo}</p>
                </div>
            </div>
        </SlideUp>
    );
};
