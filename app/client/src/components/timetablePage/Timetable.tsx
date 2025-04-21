import { StudentTimetableDetailsType } from '@sis/types';
import { RenderTimetable } from './RenderTimetable';
import { StudentTimetableDetails } from './StudentTimetableDetails';

interface TimetableProps {
    title: string;
    data: any;
    details: [StudentTimetableDetailsType];
}

export const Timetable = ({ title, data, details }: TimetableProps) => {
    return (
        <div className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7'>
            <h1 className='text-2xl font-medium mb-4'>{title}</h1>
            <div className='rounded-2xl border bg-clip-border overflow-x-scroll font-secondary'>
                <RenderTimetable data={data} />
            </div>
            <StudentTimetableDetails details={details} />
        </div>
    );
};
