import { StudentTimetableDetailsType } from '@sis/types';

export const StudentTimetableDetails = ({ details }: { details: [StudentTimetableDetailsType] }) => {
    return (
        <div className='p-2 mt-4 font-secondary'>
            <div className='text-xl font-medium'>TimetableDetails</div>
            <ul className='px-8 py-4 text-lg font-medium'>
                {details.map((detail: StudentTimetableDetailsType, index: number) => (
                    <li className='mb-1'>
                        {index + 1}. {detail.subjectName} ({detail.code}) - {detail.staff}
                    </li>
                ))}
            </ul>
        </div>
    );
};
