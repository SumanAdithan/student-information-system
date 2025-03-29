// import { download } from '@assets';
import { view } from '@assets';
import { RootState, setStudent } from '@store';
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
            const dispatch = useDispatch();

            const { role } = useSelector((state: RootState) => state.profile);
            const path = role === 'faculty' ? 'faculty' : role === 'admin' ? 'admin' : '';

            const handleViewClick = () => {
                dispatch(setStudent(row.original));
                navigate(`/${path}/students/view`);
            };
            return (
                <div className='flex justify-center'>
                    <img src={view} alt='true' className='w-6' onClick={handleViewClick} />
                </div>
            );
        },
    }),
];
