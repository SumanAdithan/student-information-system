import { useTableConfig } from '@hooks';
import { downloadNotesColumnConfig as columns } from './DownloadNotesColumn';
import { RenderListTable, TablePageination } from '@components';
import { useState } from 'react';
import { Search } from 'lucide-react';

interface DownloadNotesTableProps {
    title: string;
    data: any;
}

export const DownloadNotesTable = ({ title, data }: DownloadNotesTableProps) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const table = useTableConfig({ data, columns, globalFilter, setGlobalFilter, pageSize: 5 });
    return (
        <div className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7'>
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
                    {/* <button
                        className='text-white hover:bg-green-700 bg-green-600 py-2 px-4 rounded-lg'
                        onClick={() => openModal('ADD')}
                    >
                        <h3>Add</h3>
                    </button> */}
                </div>
            </div>
            <div className='overflow-x-scroll font-secondary'>
                <RenderListTable table={table} />
            </div>
            <TablePageination table={table} name={title} />
        </div>
    );
};
