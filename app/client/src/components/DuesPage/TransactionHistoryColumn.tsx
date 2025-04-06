import { download } from '@assets';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<any>();

export const transactionHistoryColumnConfig = [
    columnHelper.accessor('date', { header: 'Date' }),
    columnHelper.accessor('transactionId', { header: 'Transaction ID' }),
    columnHelper.accessor('category', { header: 'Category' }),
    columnHelper.accessor('amount', { header: 'Amount' }),
    columnHelper.accessor('method', { header: 'Method' }),
    columnHelper.display({
        header: 'Receipt',
        cell: () => (
            <div className='flex justify-center'>
                <img src={download} alt='true' className='w-6' />
            </div>
        ),
    }),
];
