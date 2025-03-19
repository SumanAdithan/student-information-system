import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<any>();

export const semesterResultColumnConfig = [
    columnHelper.accessor('name', { header: 'Subject Name' }),
    columnHelper.accessor('grade', { header: 'Grade' }),
];
