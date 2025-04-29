import { view } from '@assets';
import { AppDispatch, toggleView, setTimetable } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch } from 'react-redux';

const columnHelper = createColumnHelper<any>();

export const FacultyTimetableColumnConfig = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleViewClick = async (timetable: any) => {
        dispatch(setTimetable(timetable));
        dispatch(toggleView());
    };

    const facultyTimetableColumnConfig = [
        columnHelper.accessor('name', { header: 'Name', cell: () => <div>Student Timetable</div> }),
        columnHelper.accessor('year', { header: 'Year' }),

        columnHelper.display({
            id: 'view',
            header: 'Action',
            cell: ({ row }) => (
                <div className='flex justify-center gap-2'>
                    <img
                        src={view}
                        alt='view'
                        className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                        onClick={() => handleViewClick(row.original)}
                    />
                </div>
            ),
        }),
    ];

    return { facultyTimetableColumnConfig };
};
