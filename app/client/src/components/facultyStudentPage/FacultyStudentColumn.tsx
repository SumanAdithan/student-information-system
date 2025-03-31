// import { download } from '@assets';
import { edit, trash, view } from '@assets';
import { useStudentMutations } from '@queries';
import { AppDispatch, RootState, setModal, setStudent } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const columnHelper = createColumnHelper<any>();

export const FacultyStudentColumnConfig = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { deleteStudentMutation } = useStudentMutations();

    const { role } = useSelector((state: RootState) => state.profile);
    const path = role === 'faculty' ? 'faculty' : role === 'admin' ? 'admin' : '';

    const handleViewClick = (student: any) => {
        dispatch(setStudent(student));
        navigate(`/${path}/students/view`);
    };

    const handleEditClick = (student: any) => {
        dispatch(setStudent(student));
        dispatch(setModal({ active: true, status: 'edit' }));
    };

    const handleDeleteClick = (studentId: string) => {
        deleteStudentMutation.mutate({ studentId });
    };
    const facultyStudentColumnConfig = [
        columnHelper.accessor('name', { header: 'Name' }),
        columnHelper.accessor('registerNo', { header: 'Roll Number' }),
        columnHelper.accessor('year', { header: 'Year' }),
        columnHelper.accessor('semester', { header: 'Semester' }),
        columnHelper.accessor('batch', { header: 'Batch' }),
        columnHelper.display({
            id: 'view',
            header: 'View',
            cell: ({ row }) => (
                <div className='flex justify-center gap-2'>
                    <img
                        src={view}
                        alt='view'
                        className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                        onClick={() => handleViewClick(row.original)}
                    />
                    <img
                        src={edit}
                        alt='edit'
                        className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                        onClick={() => handleEditClick(row.original)}
                    />
                    <img
                        src={trash}
                        alt='delete'
                        className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                        onClick={() => handleDeleteClick(row.original._id)}
                    />
                </div>
            ),
        }),
    ];

    return { facultyStudentColumnConfig };
};
