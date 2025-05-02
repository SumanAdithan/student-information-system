import { getDuesAndApprovalsData } from '@api';
import { edit, tickMark, view, xMark } from '@assets';
import { DuesAndApprovals } from '@sis/types';
import { AppDispatch, setEditDuesAndApprovals, setDuesAndApprovals, setModal, toggleView } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch } from 'react-redux';

const columnHelper = createColumnHelper<any>();

export const FacultyDuesAndApprovalsColumn = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleViewClick = async (registerNo: number) => {
        const duesAndApprovals = await getDuesAndApprovalsData(registerNo);
        if (duesAndApprovals) {
            dispatch(setDuesAndApprovals(duesAndApprovals));
        }
        dispatch(toggleView());
    };

    const handleEditClick = (duesAndApprovals: DuesAndApprovals) => {
        dispatch(setEditDuesAndApprovals(duesAndApprovals));
        dispatch(setModal({ active: true, status: 'edit' }));
    };

    const facultyDuesAndApprovalsColumnConfig = [
        columnHelper.accessor('name', { header: 'Name' }),
        columnHelper.accessor('year', { header: 'Year' }),
        columnHelper.accessor('pending', { header: 'Pending' }),
        columnHelper.accessor('isPartialPaid', {
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
        columnHelper.accessor('approvals.approved', {
            header: 'Eligible',
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
                        onClick={() => handleEditClick(row.original)}
                    />
                </div>
            ),
        }),
    ];

    return { facultyDuesAndApprovalsColumnConfig };
};
