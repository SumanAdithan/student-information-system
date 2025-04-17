import { download, trash } from '@assets';
import { RootState } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useSelector } from 'react-redux';

export const DownloadNotesColumnConfig = () => {
    const columnHelper = createColumnHelper<any>();
    const { role } = useSelector((state: RootState) => state.profile);

    const downloadNotesColumnConfig = [
        columnHelper.accessor('subjectName', { header: 'Name' }),
        columnHelper.accessor('code', { header: 'Code' }),
        columnHelper.accessor('regulation', { header: 'Regulation' }),
        columnHelper.accessor('semester', { header: 'Semester' }),
        columnHelper.display({
            id: 'download',
            header: 'Download',
            cell: () => (
                <div className='flex justify-center gap-2'>
                    <img src={download} alt='true' className='w-6' />
                    {role === 'admin' && (
                        <img
                            src={trash}
                            alt='delete'
                            className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                            // onClick={() => handleDeleteClick(row.original._id)}
                        />
                    )}
                </div>
            ),
        }),
    ];

    return { downloadNotesColumnConfig };
};
