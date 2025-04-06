import { useTableConfig } from '@hooks';
import { FacultyDuesColumn } from './FacultyDuesColumn';
import { Loading, RenderListTable, SearchBar, Select, TablePageination } from '@components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, toggleSelect } from '@store';
import { FacultyDuesTableForm } from './FacultyDuesTableForm';
import { useGetAllDues } from '@queries';
import { DUES_PARTIAL_PAID_OPTIONS, YEAR_OPTIONS } from '@constants';

interface FacultyDuesTableProps {
    title: string;
}

export const FacultyDuesTable = ({ title }: FacultyDuesTableProps) => {
    const dispatch = useDispatch<AppDispatch>();

    // state for filtering
    const [year, setYear] = useState(YEAR_OPTIONS[0].value);
    const [isPartialPaid, setIsPartialPaid] = useState(DUES_PARTIAL_PAID_OPTIONS[0].value);
    const [globalFilter, setGlobalFilter] = useState('');
    const { data, isLoading, error } = useGetAllDues(year, isPartialPaid);

    const { facultyDuesColumnConfig: columns } = FacultyDuesColumn();
    const table = useTableConfig({ data: data?.dues, columns, globalFilter, setGlobalFilter, pageSize: 5 });

    const { editModal } = useSelector((state: RootState) => state.action);
    const { activeSelect } = useSelector((state: RootState) => state.layout);

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;
    return (
        <>
            <div className='relative bg-white p-6 pb-10 rounded-2xl shadow-section mb-7 backdrop-blur-md  overflow-hidden'>
                <div className='flex justify-between  mb-6 min-w-max gap-5 flex-col lg:items-center lg:flex-row'>
                    <h1 className='text-2xl font-medium'>{title}</h1>
                    <div className=' flex items-center gap-2 '>
                        <Select
                            value={year}
                            onChange={setYear}
                            options={YEAR_OPTIONS}
                            isOpen={activeSelect === 'year'}
                            toggleOpen={() => dispatch(toggleSelect('year'))}
                            onClose={() => dispatch(toggleSelect('year'))}
                        />
                        <Select
                            value={isPartialPaid}
                            onChange={setIsPartialPaid}
                            options={DUES_PARTIAL_PAID_OPTIONS}
                            isOpen={activeSelect === 'status'}
                            toggleOpen={() => dispatch(toggleSelect('status'))}
                            onClose={() => dispatch(toggleSelect('status'))}
                        />

                        <SearchBar value={globalFilter} onChange={setGlobalFilter} placeholder='Search Name...' />
                    </div>
                </div>
                <div className='overflow-x-scroll font-secondary'>
                    <RenderListTable table={table} />
                </div>
                <TablePageination table={table} name={title} />
            </div>
            {editModal.active && <FacultyDuesTableForm />}
        </>
    );
};
