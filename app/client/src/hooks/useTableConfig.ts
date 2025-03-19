import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

interface TableConfigProps {
    data: any[];
    columns: any[];
    globalFilter?: string;
    setGlobalFilter?: Dispatch<SetStateAction<string>>;
    pageSize?: number;
}

export const useTableConfig = ({ data, columns, globalFilter, setGlobalFilter, pageSize }: TableConfigProps) => {
    return useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        ...(setGlobalFilter && { onGlobalFilterChange: setGlobalFilter }),
        initialState: {
            pagination: {
                pageIndex: 0,
                ...(pageSize && { pageSize }),
            },
        },
        state: {
            ...(globalFilter !== undefined && { globalFilter }),
        },
    });
};
