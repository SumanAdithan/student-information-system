import { useTableConfig } from '@hooks';
import { DownloadNotesColumnConfig } from './DownloadNotesColumn';
import { RenderListTable, TablePageination } from '@components';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setModal } from '@store';
import { DownloadNotesTableForm } from './DownloadNotesTableForm';
import { SlideUp } from '@ui';

interface DownloadNotesTableProps {
    title: string;
    data: any;
}

export const DownloadNotesTable = ({ title, data }: DownloadNotesTableProps) => {
    const dispatch = useDispatch();
    const [globalFilter, setGlobalFilter] = useState('');
    const { downloadNotesColumnConfig: columns } = DownloadNotesColumnConfig();
    const table = useTableConfig({ data, columns, globalFilter, setGlobalFilter, pageSize: 5 });
    const { editModal } = useSelector((state: RootState) => state.action);

    return (
        <>
            <SlideUp className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7' initial={30} duration={1}>
                <div className='flex justify-between  mb-6 min-w-max gap-5 flex-col lg:items-center lg:flex-row'>
                    <h1 className='text-2xl font-medium'>{title}</h1>
                    <div className='relative flex items-center gap-2 '>
                        <Search className='absolute left-3 text-font-primary sm:left-2.5 top-2.5' size={20} />
                        <input
                            type='text'
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder='Search Notes...'
                            className='bg-search-input text-font-primary placeholder-font-primary rounded-lg pl-10 pr-4 py-2 w-[150px] sm:w-full  outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <button
                            className='text-white  bg-primary py-2 px-4 rounded-lg duration-300 hover:scale-110'
                            onClick={() => dispatch(setModal({ active: true, status: 'add' }))}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div className='overflow-x-scroll font-secondary'>
                    <RenderListTable table={table} />
                </div>
                <TablePageination table={table} name={title} />
            </SlideUp>
            {editModal.active && <DownloadNotesTableForm />}
        </>
    );
};
