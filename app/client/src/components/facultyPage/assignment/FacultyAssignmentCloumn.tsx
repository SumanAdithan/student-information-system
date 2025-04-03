import { getAssignmentData } from '@api';
import { edit, view } from '@assets';
import { AppDispatch, setAssignment, setModal, setStudent, toggleView } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch } from 'react-redux';

const columnHelper = createColumnHelper<any>();

export const FacultyAssignmentColumnConfig = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleViewClick = async (registerNo: number) => {
        const assignment = await getAssignmentData(registerNo);
        if (assignment) {
            dispatch(setAssignment(assignment));
        }
        dispatch(toggleView());
    };

    const handleEditClick = (student: any) => {
        dispatch(setStudent(student));
        dispatch(setModal({ active: true, status: 'edit' }));
    };

    const facultyAssignmentColumnConfig = [
        columnHelper.accessor('name', { header: 'Name' }),
        columnHelper.accessor('subject', { header: 'Subject' }),
        columnHelper.accessor('code', { header: 'Code' }),
        columnHelper.accessor('status', { header: 'Status' }),
        columnHelper.accessor('mark', { header: 'Mark' }),
        columnHelper.display({
            id: 'view',
            header: 'Action',
            cell: ({ row }) => (
                <div className='flex justify-center gap-2'>
                    <img
                        src={view}
                        alt='view'
                        className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                        onClick={() => handleViewClick(row.original.registerNo)}
                    />
                    <img
                        src={edit}
                        alt='edit'
                        className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                        onClick={() => console.log(row.original)}
                    />
                </div>
            ),
        }),
    ];

    return { facultyAssignmentColumnConfig };
};
