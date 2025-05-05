import { StatCard } from '@components';
import { RootState } from '@store';
import { getFacultyOverviewData } from '@utils';
import { CustomStackedBarChart, CustomBarChart } from '@charts';
import { useSelector } from 'react-redux';
import { getDuesStat, getInternalResultStat } from '@api';
import { useEffect, useState } from 'react';
import { SlideUp } from '@ui';

export const ViewFaculty = () => {
    const { faculty } = useSelector((state: RootState) => state.faculty);
    const { overviewStat, subjectDetails } = getFacultyOverviewData(faculty);

    const [dueStatistics, setDueStatistics] = useState([]);
    const [internalStatistics, setInternalStatistics] = useState([]);

    useEffect(() => {
        const fetchDueStats = async () => {
            try {
                const { dueStatistics } = await getDuesStat();
                const { internalResultStatistics } = await getInternalResultStat();
                setDueStatistics(dueStatistics);
                setInternalStatistics(internalResultStatistics);
                console.log(internalResultStatistics);
            } catch (error) {
                console.error('Error fetching due statistics:', error);
            }
        };

        fetchDueStats();
    }, []);

    const transformedDueStatisticsData = dueStatistics.map((item: any) => ({
        name: `Year ${item.year}`,
        '50% Paid': item.partial,
        '50% Not Paid': item.not_partial,
        'Fully Paid': item.fully_paid,
    }));

    const transformedInternalStatisticsData = internalStatistics.map((item: any) => ({
        name: `Year ${item.year}`,
        'Internal 1': item.internal_1_pass,
        'Internal 2': item.internal_2_pass,
        'Internal 3': item.internal_3_pass,
    }));

    console.log(transformedInternalStatisticsData);

    return (
        <>
            <div>
                <SlideUp className='bg-white p-6 pb-8 rounded-2xl shadow-section mb-7' initial={30} duration={1}>
                    <h1 className='text-2xl font-medium mb-4'>Welcome {faculty.name}</h1>
                    <div className='flex justify-center flex-wrap xl:flex-nowrap gap-5 pb-4'>
                        {overviewStat.map((stat, i) => (
                            <StatCard key={i} {...stat} />
                        ))}
                    </div>
                </SlideUp>
                <div className='flex flex-col xl:flex-row xl:gap-5 rounded-2xl shadow-section xl:shadow-none mb-7'>
                    <SlideUp
                        className='bg-white p-6 rounded-t-2xl xl:rounded-2xl xl:w-1/2  xl:shadow-section'
                        initial={25}
                        duration={0.5}
                        delay={0.2}
                    >
                        <div className='text-xl font-medium flex items-center gap-2'>Subject Details</div>
                        <div className='h-full flex flex-col items-center gap-5 divide-y divide-font-secondary mt-4 mb-4'>
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
                    </SlideUp>
                    <SlideUp
                        className='bg-white p-6 rounded-t-2xl xl:rounded-2xl xl:w-1/2  xl:shadow-section'
                        initial={25}
                        duration={0.5}
                        delay={0.2}
                    >
                        <h2 className='text-xl font-medium mb-4 text-font-primary'>Dues Status</h2>
                        <div className='h-80 overflow-auto'>
                            <CustomStackedBarChart data={transformedDueStatisticsData} />
                        </div>
                    </SlideUp>
                </div>
                <SlideUp
                    className='bg-white p-6 rounded-t-2xl xl:rounded-2xl w-full  xl:shadow-section'
                    initial={25}
                    duration={0.6}
                    delay={0.5}
                >
                    <h2 className='text-xl font-medium mb-4 text-font-primary0'>Internal Result Status</h2>
                    <div className='h-80 overflow-auto'>
                        <CustomBarChart data={transformedInternalStatisticsData} />
                    </div>
                </SlideUp>
            </div>
        </>
    );
};
