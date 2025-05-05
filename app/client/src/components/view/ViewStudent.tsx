import { PersonalDetailsCard, ProfileCard, StatCard } from '@components';
import { RootState } from '@store';
import { SlideUp } from '@ui';
import { getStudentOverviewData } from '@utils';
import { useSelector } from 'react-redux';

export const ViewStudent = () => {
    const { student } = useSelector((state: RootState) => state.student);
    const { overviewStat, overviewProfile, overviewDetails } = getStudentOverviewData(student);

    return (
        <>
            <SlideUp className='bg-white p-6 pb-8 rounded-2xl shadow-section mb-7' initial={30} duration={1}>
                <h1 className='text-2xl font-medium mb-4'>Welcome {overviewProfile.name}</h1>
                <div className='flex justify-center flex-wrap xl:flex-nowrap gap-5 pb-4'>
                    {overviewStat.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>
            </SlideUp>
            <div className='flex flex-col xl:flex-row xl:gap-5 rounded-2xl shadow-section xl:shadow-none'>
                <ProfileCard {...overviewProfile} />
                <PersonalDetailsCard personalDetails={overviewDetails} />
            </div>
        </>
    );
};
