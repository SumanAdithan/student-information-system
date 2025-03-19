import { tickMark, xMark } from '@assets';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<any>();

export const assignmentResultColumnConfig = [
    columnHelper.accessor('name', { header: 'Subject Name' }),
    columnHelper.accessor('status', {
        header: 'Status',
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
    columnHelper.accessor('mark', { header: 'Mark' }),
];
