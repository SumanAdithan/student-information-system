import { StatCard } from '@components';
import { RootState } from '@store';
import { getFacultyOverviewData } from '@utils';
import { useSelector } from 'react-redux';

export const ViewFaculty = () => {
    const { faculty } = useSelector((state: RootState) => state.faculty);
    const { overviewStat, subjectDetails } = getFacultyOverviewData(faculty);

    return (
        <>
            <div>
                <div className='bg-white p-6 pb-8 rounded-2xl shadow-section mb-7'>
                    <h1 className='text-2xl font-medium mb-4'>Welcome</h1>
                    <div className='flex justify-center flex-wrap xl:flex-nowrap gap-5 pb-4'>
                        {overviewStat.map((stat, i) => (
                            <StatCard key={i} {...stat} />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col xl:flex-row xl:gap-5 rounded-2xl shadow-section xl:shadow-none'>
                    <div className='bg-white p-6 rounded-t-2xl xl:rounded-2xl xl:w-1/2  xl:shadow-section'>
                        <div className='text-xl font-medium flex items-center gap-2'>
                            <span>TimetableDetails</span>
                        </div>
                        <div className='h-full flex flex-col justify-center items-center gap-5 divide-y divide-font-secondary mb-4'>
                            <div className='flex items-center justify-between w-full px-4 text-lg font-medium'>
                                <div className=''>Subject Name</div>
                                <div>Year</div>
                            </div>
                            {subjectDetails.map((subject) => (
                                <div className='flex items-center justify-between w-full px-4'>
                                    <div>{`(${subject.code}) ${subject.subjectName}`}</div>
                                    <div>{`${subject.year}`}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
