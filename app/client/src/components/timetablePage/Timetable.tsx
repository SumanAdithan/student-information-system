import { TimetableDetailsType } from '@sis/types';
import { RenderTimetable } from './RenderTimetable';
import { StudentTimetableDetails } from './StudentTimetableDetails';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setEditTimetable, setModal } from '@store';
import { TimetableForm } from './TimetableForm';
import { edit } from '@assets';
import { SlideUp } from '@ui';

interface TimetableProps {
    title: string;
    data: any;
    details: [TimetableDetailsType];
}

export const Timetable = ({ title, data, details }: TimetableProps) => {
    const dispatch = useDispatch();
    const { editModal } = useSelector((state: RootState) => state.action);
    const { timetable } = useSelector((state: RootState) => state.timetable);
    const { role } = useSelector((state: RootState) => state.profile);

    const handleEditClick = () => {
        dispatch(setEditTimetable(timetable.timetable));
        dispatch(setModal({ active: true, status: 'timetable' }));
    };

    return (
        <>
            <SlideUp className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7' initial={30} duration={1}>
                <h1 className='text-2xl font-medium mb-4 flex items-center gap-2'>
                    <span>{title}</span>
                    {role === 'admin' ? (
                        <img
                            src={edit}
                            alt='edit'
                            className='w-6 h-6 duration-300 hover:scale-125'
                            onClick={handleEditClick}
                        />
                    ) : null}
                </h1>
                <div className='rounded-2xl border bg-clip-border overflow-x-scroll font-secondary'>
                    <RenderTimetable data={data} />
                </div>
                <StudentTimetableDetails details={details} />
            </SlideUp>
            {editModal.active && <TimetableForm />}
        </>
    );
};
