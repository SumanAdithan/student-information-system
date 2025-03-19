import { StatCard } from '@components';
import { studentData } from '@data';
import { getStudentOverviewData } from '@utils';
import { PersonalDetailsCard, ProfileCard } from '@components';

export const OverviewPage = () => {
    const { overviewStat, overviewProfile, overviewDetails } = getStudentOverviewData(studentData);
    return (
        <>
            <div className='bg-white p-6 pb-8 rounded-2xl shadow-section mb-7'>
                <h1 className='text-2xl font-medium mb-4'>Welcome</h1>
                <div className='flex justify-center flex-wrap xl:flex-nowrap gap-5 pb-4'>
                    {overviewStat.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col xl:flex-row xl:gap-5 rounded-2xl shadow-section xl:shadow-none'>
                <ProfileCard {...overviewProfile} />
                <PersonalDetailsCard personalDetails={overviewDetails} />
            </div>
        </>
    );
};
