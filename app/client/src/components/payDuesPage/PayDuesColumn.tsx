import { activePayBtn, inActivePayBtn } from '@assets';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<any>();

export const payDuesColumnConfig = [
    columnHelper.accessor('category', { header: 'Category' }),
    columnHelper.accessor('monthly_pay', { header: 'Monthly Pay' }),
    columnHelper.accessor('total', { header: 'Total' }),
    columnHelper.accessor('paid', { header: 'Paid' }),
    columnHelper.accessor('pending', { header: 'Pending' }),
    columnHelper.display({
        header: 'Pay Now',
        cell: ({ row }) => (
            <div className='flex justify-center'>
                <img src={row.original.fully_paid ? inActivePayBtn : activePayBtn} alt='true' className='w-20' />
            </div>
        ),
    }),
];
