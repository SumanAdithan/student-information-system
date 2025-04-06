import { useTableConfig } from '@hooks';
import { FacultyAssignmentColumnConfig } from './FacultyAssignmentCloumn';
import { Loading, RenderListTable, SearchBar, Select, TablePageination } from '@components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, toggleSelect } from '@store';
import { FacultyAssignmentTableForm } from './FacultyAssignmentTableForm';
import { useGetAllAssignment } from '@queries';
import { ASSIGNMENT_RESULT_OPTIONS, ASSIGNMENT_STATUS_OPTIONS, YEAR_OPTIONS } from '@constants';

interface FacultyAssignmentTableProps {
    title: string;
}

export const FacultyAssignmentTable = ({ title }: FacultyAssignmentTableProps) => {
    const dispatch = useDispatch<AppDispatch>();

    // state for filtering
    const [year, setYear] = useState(YEAR_OPTIONS[0].value);
    const [status, setStatus] = useState(ASSIGNMENT_STATUS_OPTIONS[0].value);
    const [result, setResult] = useState(ASSIGNMENT_RESULT_OPTIONS[0].value);
    const [globalFilter, setGlobalFilter] = useState('');
    const { data, isLoading, error } = useGetAllAssignment(year, status, result);

    const { facultyAssignmentColumnConfig: columns } = FacultyAssignmentColumnConfig();
    const table = useTableConfig({ data: data?.assignments, columns, globalFilter, setGlobalFilter, pageSize: 5 });

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
                            value={status}
                            onChange={setStatus}
                            options={ASSIGNMENT_STATUS_OPTIONS}
                            isOpen={activeSelect === 'status'}
                            toggleOpen={() => dispatch(toggleSelect('status'))}
                            onClose={() => dispatch(toggleSelect('status'))}
                        />
                        <Select
                            value={result}
                            onChange={setResult}
                            options={ASSIGNMENT_RESULT_OPTIONS}
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
            {editModal.active && <FacultyAssignmentTableForm />}
        </>
    );
};
