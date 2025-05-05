import { edit } from '@assets';
import { TimetableDetailsType } from '@sis/types';
import { RootState, setEditTimetable, setEditTimetableDetails, setModal } from '@store';
import { useDispatch, useSelector } from 'react-redux';

export const StudentTimetableDetails = ({ details }: { details: [TimetableDetailsType] }) => {
    const dispatch = useDispatch();
    const { timetable } = useSelector((state: RootState) => state.timetable);
    const { role } = useSelector((state: RootState) => state.profile);

    const handleEditClick = () => {
        dispatch(setEditTimetableDetails(timetable.timetableDetails));
        dispatch(setModal({ active: true, status: 'timetableDetails' }));
    };
    return (
        <div className='p-2 mt-4 font-secondary'>
            <div className='text-xl font-medium flex items-center gap-2'>
                <span>Timetable Details</span>
                {role === 'admin' ? (
                    <img
                        src={edit}
                        alt='edit'
                        className='w-6 h-6 duration-300 hover:scale-125'
                        onClick={handleEditClick}
                    />
                ) : (
                    ''
                )}
            </div>
            <ul className='px-8 py-4 text-lg font-medium'>
                {details.map((detail: TimetableDetailsType, index: number) => (
                    <li className='mb-1' key={index}>
                        {index + 1}. {detail.subjectName} ({detail.code}) - {detail.staff}
                    </li>
                ))}
            </ul>
        </div>
    );
};
