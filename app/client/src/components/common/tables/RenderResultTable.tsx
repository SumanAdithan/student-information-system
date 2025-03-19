import { flexRender } from '@tanstack/react-table';

export const RenderResultTable = ({ table }: any) => {
    return (
        <table className='bg-primary-light w-full divide-y divide-font-secondary min-w-[650px]'>
            <thead className='bg-primary '>
                {table.getHeaderGroups().map((headerGroup: any) => (
                    <tr key={headerGroup.id} className='divide-x divide-font-secondary'>
                        {headerGroup.headers.map((header: any) => (
                            <th key={header.id} className='font-semibold text-xl p-3'>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className='divide-y divide-font-secondary'>
                {table.getRowModel().rows.map((row: any) => (
                    <tr key={row.id} className='divide-x divide-font-secondary'>
                        {row.getVisibleCells().map((cell: any, i: number) => (
                            <td
                                key={cell.id}
                                className={`font-medium text-lg ${i === 0 ? 'text-left max-w-36' : 'text-center'} p-3`}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
