import { downloadFacultyQrCode } from '@api';
import { download, edit, trash, view } from '@assets';
import { useFacultyMutations } from '@queries';
import { AppDispatch, RootState, setModal, setFaculty, toggleView } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';

const columnHelper = createColumnHelper<any>();

export const AdminFacultyColumnConfig = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { deleteFacultyMutation } = useFacultyMutations();
    const { role } = useSelector((state: RootState) => state.profile);

    const handleViewClick = (faculty: any) => {
        dispatch(setFaculty(faculty));
        dispatch(toggleView());
    };

    const handleEditClick = (faculty: any) => {
        dispatch(setFaculty(faculty));
        dispatch(setModal({ active: true, status: 'edit' }));
    };

    const handleDeleteClick = (facultyId: string) => {
        deleteFacultyMutation.mutate({ facultyId });
    };
    const adminFacultyColumnConfig = [
        columnHelper.accessor('name', { header: 'Name' }),
        columnHelper.accessor('position', { header: 'Roll' }),
        columnHelper.accessor('total_subjects', { header: 'Total Subjects' }),
        columnHelper.accessor('total_classes', { header: 'Total Classes' }),
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
                                onClick={() => handleDeleteClick(row.original._id)}
                            />
                            <img
                                src={download}
                                alt='download'
                                className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                                onClick={() => downloadFacultyQrCode(row.original._id)}
                            />
                        </>
                    )}
                </div>
            ),
        }),
    ];

    return { adminFacultyColumnConfig };
};
