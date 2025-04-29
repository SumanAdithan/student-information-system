import { edit } from '@assets';
import { TimetableDetailsType } from '@sis/types';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

export const StudentTimetableDetails = ({ details }: { details: [TimetableDetailsType] }) => {
    const { role } = useSelector((state: RootState) => state.profile);

    return (
        <div className='p-2 mt-4 font-secondary'>
            <div className='text-xl font-medium flex items-center gap-2'>
                <span>TimetableDetails</span>
                {role === 'admin' ? <img src={edit} alt='edit' className='w-6 h-6' /> : ''}
            </div>
            <ul className='px-8 py-4 text-lg font-medium'>
                {details.map((detail: TimetableDetailsType, index: number) => (
                    <li className='mb-1'>
                        {index + 1}. {detail.subjectName} ({detail.code}) - {detail.staff}
                    </li>
                ))}
            </ul>
        </div>
    );
};
