import { flexRender } from '@tanstack/react-table';

export const RenderListTable = ({ table }: any) => {
    return (
        <table className=' w-full  min-w-[650px]'>
            <thead>
                {table.getHeaderGroups().map((headerGroup: any) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header: any, i: number) => (
                            <th
                                key={header.id}
                                className={`font-semibold text-xl ${
                                    i === 0 ? 'text-left max-w-36' : 'text-center'
                                } px-6 py-3`}
                            >
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
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell: any, i: number) => (
                            <td
                                key={cell.id}
                                className={`font-medium text-lg ${
                                    i === 0 ? 'text-left max-w-36' : 'text-center'
                                } px-6 py-4`}
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
