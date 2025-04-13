import { getDuesData } from '@api';
import { edit, tickMark, view, xMark } from '@assets';
import { AppDispatch, setEditDues, setDues, setModal, toggleView } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch } from 'react-redux';

const columnHelper = createColumnHelper<any>();

export const FacultyDuesColumn = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleViewClick = async (registerNo: number) => {
        const dues = await getDuesData(registerNo, false);
        if (dues) {
            dispatch(setDues(dues));
        }
        dispatch(toggleView());
    };

    const handleEditClick = async (registerNo: number) => {
        const dues = await getDuesData(registerNo, true);
        dispatch(setEditDues(dues));
        dispatch(setModal({ active: true, status: 'edit' }));
    };

    const facultyDuesColumnConfig = [
        columnHelper.accessor('name', { header: 'Name' }),
        columnHelper.accessor('year', { header: 'Year' }),
        columnHelper.accessor('total_amount', { header: 'Total' }),
        columnHelper.accessor('pending_amount', { header: 'Pending' }),
        columnHelper.accessor('isPartial_paid', {
            header: '50% Paid',
            cell: (info) => (
                <div className='flex justify-center'>
                    {info.getValue() ? (
                        <img src={tickMark} alt='true' className='w-3' />
                    ) : (
                        <img src={xMark} alt='false' className='w-3' />
                    )}
                </div>
            ),
        }),
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
                        onClick={() => handleEditClick(row.original.registerNo)}
                    />
                </div>
            ),
        }),
    ];

    return { facultyDuesColumnConfig };
};
