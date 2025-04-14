import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<any>();

export const transactionHistoryColumnConfig = [
    columnHelper.accessor('transactionId', { header: 'Transaction ID' }),
    columnHelper.accessor('category', { header: 'Category' }),
    columnHelper.accessor('amount', { header: 'Amount' }),
    columnHelper.accessor('method', { header: 'Method' }),
    columnHelper.accessor('paidOn', { header: 'Paid On' }),
];
