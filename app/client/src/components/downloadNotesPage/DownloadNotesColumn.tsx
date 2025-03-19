import { download } from '@assets';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<any>();

export const downloadNotesColumnConfig = [
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('code', { header: 'Code' }),
    columnHelper.accessor('regulation', { header: 'Regulation' }),
    columnHelper.accessor('semester', { header: 'Semester' }),
    columnHelper.display({
        id: 'download',
        header: 'Download',
        cell: () => (
            <div className='flex justify-center'>
                <img src={download} alt='true' className='w-6' />
            </div>
        ),
    }),
];
