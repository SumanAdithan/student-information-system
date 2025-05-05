import { useTableConfig } from '@hooks';
import { FacultySemesterResultColumn } from './FacultySemesterResultColumn';
import { Loading, RenderListTable, SearchBar, Select, TablePageination } from '@components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, toggleSelect } from '@store';
import { FacultySemesterResultTableForm } from './FacultySemesterResultTableForm';
import { useGetAllSemesterResult } from '@queries';
import { SEMESTER_RESULT_OPTIONS, SEMESTER_STATUS_OPTIONS, YEAR_OPTIONS } from '@constants';
import { SlideUp } from '@ui';

interface FacultySemesterResultTableProps {
    title: string;
}

export const FacultySemesterResultTable = ({ title }: FacultySemesterResultTableProps) => {
    const dispatch = useDispatch<AppDispatch>();

    // state for filtering
    const [year, setYear] = useState(YEAR_OPTIONS[0].value);
    const [status, setStatus] = useState(SEMESTER_STATUS_OPTIONS[0].value);
    const [result, setResult] = useState(SEMESTER_RESULT_OPTIONS[0].value);
    const [globalFilter, setGlobalFilter] = useState('');
    const { data, isLoading, error } = useGetAllSemesterResult(year, status, result);

    const { facultySemesterResultColumnConfig: columns } = FacultySemesterResultColumn();
    const table = useTableConfig({ data: data?.semesterResults, columns, globalFilter, setGlobalFilter, pageSize: 5 });

    const { editModal } = useSelector((state: RootState) => state.action);
    const { activeSelect } = useSelector((state: RootState) => state.layout);

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;
    return (
        <>
            <SlideUp
                className='relative bg-white p-6 pb-10 rounded-2xl shadow-section mb-7 backdrop-blur-md  overflow-hidden'
                initial={30}
                duration={1}
            >
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
                            value={status}
                            onChange={setStatus}
                            options={SEMESTER_STATUS_OPTIONS}
                            isOpen={activeSelect === 'status'}
                            toggleOpen={() => dispatch(toggleSelect('status'))}
                            onClose={() => dispatch(toggleSelect('status'))}
                        />
                        <Select
                            value={result}
                            onChange={setResult}
                            options={SEMESTER_RESULT_OPTIONS}
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
            </SlideUp>
            {editModal.active && <FacultySemesterResultTableForm />}
        </>
    );
};
