import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<any>();

export const internalResultColumnConfig = [
    columnHelper.accessor('name', { header: 'Subject Name' }),
    columnHelper.accessor('mark', { header: 'Mark' }),
];
