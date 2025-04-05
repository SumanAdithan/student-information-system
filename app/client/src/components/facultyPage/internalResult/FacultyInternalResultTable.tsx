import { useTableConfig } from '@hooks';
import { FacultyInternalResultColumn } from './FacultyInternalResultColumn';
import { Loading, RenderListTable, SearchBar, Select, TablePageination } from '@components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, toggleSelect } from '@store';
import { FacultyInternalResultTableForm } from './FacultyInternalResultTableForm';
import { useGetAllInternalResult } from '@queries';
import { INTERNAL_RESULT_OPTIONS, INTERNAL_STATUS_OPTIONS, INTERNAL_YEAR_OPTIONS } from '@constants';

interface FacultyInternalResultTableProps {
    title: string;
}

export const FacultyInternalResultTable = ({ title }: FacultyInternalResultTableProps) => {
    const dispatch = useDispatch<AppDispatch>();

    // state for filtering
    const [year, setYear] = useState(INTERNAL_YEAR_OPTIONS[0].value);
    const [status, setStatus] = useState(INTERNAL_STATUS_OPTIONS[0].value);
    const [result, setResult] = useState(INTERNAL_RESULT_OPTIONS[0].value);
    const [globalFilter, setGlobalFilter] = useState('');
    const { data, isLoading, error } = useGetAllInternalResult(year, status, result);

    const { facultyInternalResultColumnConfig: columns } = FacultyInternalResultColumn();
    const table = useTableConfig({ data: data?.internalResults, columns, globalFilter, setGlobalFilter, pageSize: 5 });

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
                            options={INTERNAL_YEAR_OPTIONS}
                            isOpen={activeSelect === 'year'}
                            toggleOpen={() => dispatch(toggleSelect('year'))}
                            onClose={() => dispatch(toggleSelect('year'))}
                        />
                        <Select
                            value={status}
                            onChange={setStatus}
                            options={INTERNAL_STATUS_OPTIONS}
                            isOpen={activeSelect === 'status'}
                            toggleOpen={() => dispatch(toggleSelect('status'))}
                            onClose={() => dispatch(toggleSelect('status'))}
                        />
                        <Select
                            value={result}
                            onChange={setResult}
                            options={INTERNAL_RESULT_OPTIONS}
                            isOpen={activeSelect === 'result'}
                            toggleOpen={() => dispatch(toggleSelect('result'))}
                            onClose={() => dispatch(toggleSelect('result'))}
                        />
                        <SearchBar value={globalFilter} onChange={setGlobalFilter} placeholder='Search Subjects...' />
                    </div>
                </div>
                <div className='overflow-x-scroll font-secondary'>
                    <RenderListTable table={table} />
                </div>
                <TablePageination table={table} name={title} />
            </div>
            {editModal.active && <FacultyInternalResultTableForm />}
        </>
    );
};
