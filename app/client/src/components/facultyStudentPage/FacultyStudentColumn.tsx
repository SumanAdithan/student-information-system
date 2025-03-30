// import { download } from '@assets';
import { edit, trash, view } from '@assets';
import { AppDispatch, RootState, setModal, setStudent } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const columnHelper = createColumnHelper<any>();

export const facultyStudentColumnConfig = [
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('registerNo', { header: 'Roll Number' }),
    columnHelper.accessor('year', { header: 'Year' }),
    columnHelper.accessor('semester', { header: 'Semester' }),
    columnHelper.accessor('batch', { header: 'Batch' }),
    columnHelper.display({
        id: 'view',
        header: 'View',
        cell: ({ row }) => {
            const navigate = useNavigate();
            const dispatch = useDispatch<AppDispatch>();

            const { role } = useSelector((state: RootState) => state.profile);
            const path = role === 'faculty' ? 'faculty' : role === 'admin' ? 'admin' : '';

            const handleViewClick = () => {
                dispatch(setStudent(row.original));
                navigate(`/${path}/students/view`);
            };
            return (
                <div className='flex justify-center gap-2'>
                    <img
                        src={view}
                        alt='view'
                        className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                        onClick={handleViewClick}
                    />
                    <img
                        src={edit}
                        alt='edit'
                        className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                        onClick={() => {
                            dispatch(setStudent(row.original));
                            dispatch(setModal({ active: true, status: 'edit' }));
                        }}
                    />
                    <img
                        src={trash}
                        alt='delete'
                        className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                        onClick={handleViewClick}
                    />
                </div>
            );
        },
    }),
];
