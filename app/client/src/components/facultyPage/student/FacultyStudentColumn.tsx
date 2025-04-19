import { downloadStudentQrCode } from '@api';
import { download, edit, trash, view } from '@assets';
import { useStudentMutations } from '@queries';
import { AppDispatch, RootState, setModal, setStudent, toggleView } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';

const columnHelper = createColumnHelper<any>();

export const FacultyStudentColumnConfig = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { deleteStudentMutation } = useStudentMutations();
    const { role } = useSelector((state: RootState) => state.profile);

    const handleViewClick = (student: any) => {
        dispatch(setStudent(student));
        dispatch(toggleView());
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
            header: 'Action',
            cell: ({ row }) => (
                <div className='flex justify-center gap-2'>
                    <img
                        src={view}
                        alt='view'
                        className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                        onClick={() => handleViewClick(row.original)}
                    />
                    {role === 'admin' && (
                        <>
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
                                onClick={() => handleDeleteClick(row.original.id)}
                            />
                            <img
                                src={download}
                                alt='download'
                                className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                                onClick={() => downloadStudentQrCode(row.original.id)}
                            />
                        </>
                    )}
                </div>
            ),
        }),
    ];

    return { facultyStudentColumnConfig };
};
