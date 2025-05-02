import { downloadNotesPdf } from '@api';
import { download, trash } from '@assets';
import { useDownloadNotesMutation } from '@queries';
import { RootState } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useSelector } from 'react-redux';

export const DownloadNotesColumnConfig = () => {
    const columnHelper = createColumnHelper<any>();
    const { role } = useSelector((state: RootState) => state.profile);
    const { deleteNotesMutation } = useDownloadNotesMutation();

    const downloadNotesColumnConfig = [
        columnHelper.accessor('subjectName', { header: 'Name' }),
        columnHelper.accessor('code', { header: 'Code' }),
        columnHelper.accessor('regulation', { header: 'Regulation' }),
        columnHelper.accessor('semester', { header: 'Semester' }),
        columnHelper.display({
            id: 'download',
            header: 'Download',
            cell: ({ row }) => (
                <div className='flex justify-center gap-2'>
                    <img
                        src={download}
                        alt='true'
                        className='w-6'
                        onClick={() => downloadNotesPdf(`${row.original.subjectName}(${row.original.code}).met.pdf`)}
                    />
                    {role === 'admin' && (
                        <img
                            src={trash}
                            alt='delete'
                            className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                            onClick={() => deleteNotesMutation.mutate({ notesId: row.original._id })}
                        />
                    )}
                </div>
            ),
        }),
    ];

    return { downloadNotesColumnConfig };
};
