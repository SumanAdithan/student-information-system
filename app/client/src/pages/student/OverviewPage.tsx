import { studentData } from '@data';
import { getStudentOverviewData } from '@utils';

export const OverviewPage = () => {
    console.log(getStudentOverviewData(studentData));
    return (
        <>
            <div className='bg-white p-6 pb-8 rounded-2xl shadow-section mb-7'>
                <h1 className='text-2xl font-medium mb-4'>Welcome</h1>
                <div className='flex justify-center flex-wrap xl:flex-nowrap gap-5 pb-4'>{}</div>
            </div>
        </>
    );
};
