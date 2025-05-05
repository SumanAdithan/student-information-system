import { downloadCircularPdf } from '@api';
import { download, trash } from '@assets';
import { useCircularMutation } from '@queries';
import { RootState } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useSelector } from 'react-redux';

export const CircularColumnConfig = () => {
    const columnHelper = createColumnHelper<any>();
    const { role } = useSelector((state: RootState) => state.profile);
    const { deleteCircularMutation } = useCircularMutation();

    const downloadCircularColumnConfig = [
        columnHelper.accessor('name', { header: 'Name' }),
        columnHelper.accessor('year', { header: 'Year' }),
        columnHelper.accessor('date', { header: 'Date' }),
        columnHelper.display({
            id: 'download',
            header: 'Download',
            cell: ({ row }) => (
                <div className='flex justify-center gap-2'>
                    <img
                        src={download}
                        alt='true'
                        className='w-6'
                        onClick={() => downloadCircularPdf(`${row.original.name}(${row.original.date}).met.pdf`)}
                    />
                    {role === 'admin' && (
                        <img
                            src={trash}
                            alt='delete'
                            className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                            onClick={() => deleteCircularMutation.mutate({ circularId: row.original._id })}
                        />
                    )}
                </div>
            ),
        }),
    ];

    return { downloadCircularColumnConfig };
};
