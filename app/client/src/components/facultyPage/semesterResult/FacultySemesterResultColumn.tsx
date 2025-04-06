import { getSemesterResultData } from '@api';
import { edit, tickMark, view, xMark } from '@assets';
import { UpdateSemesterResult } from '@sis/types';
import { AppDispatch, setEditSemesterResult, setSemesterResult, setModal, toggleView } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch } from 'react-redux';

const columnHelper = createColumnHelper<any>();

export const FacultySemesterResultColumn = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleViewClick = async (registerNo: number) => {
        const semesterResult = await getSemesterResultData(registerNo);
        if (semesterResult) {
            dispatch(setSemesterResult(semesterResult));
        }
        dispatch(toggleView());
    };

    const handleEditClick = (semesterResult: UpdateSemesterResult) => {
        dispatch(setEditSemesterResult(semesterResult));
        dispatch(setModal({ active: true, status: 'edit' }));
    };

    const facultySemesterResultColumnConfig = [
        columnHelper.accessor('name', { header: 'Name' }),
        columnHelper.accessor('subject', { header: 'Subject' }),
        columnHelper.accessor('code', { header: 'Code' }),
        columnHelper.accessor('status', {
            header: 'Pass',
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
        columnHelper.accessor('grade', { header: 'Grade' }),
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

    return { facultySemesterResultColumnConfig };
};
