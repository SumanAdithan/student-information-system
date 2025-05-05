import { useTableConfig } from '@hooks';
import { FacultyTimetableColumnConfig } from './FacultyTimetableColumn';
import { Loading, RenderListTable, SearchBar, Select, TablePageination } from '@components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, toggleSelect } from '@store';
import { useGetAllStudentTimetable } from '@queries';
import { TIMETABLE_OPTIONS } from '@constants';
import { SlideUp } from '@ui';

interface FacultySemesterResultTableProps {
    title: string;
}

export const FacultyTimetable = ({ title }: FacultySemesterResultTableProps) => {
    const dispatch = useDispatch<AppDispatch>();

    // state for filtering
    const [timetable, setTimetable] = useState(TIMETABLE_OPTIONS[0].value);
    const [globalFilter, setGlobalFilter] = useState('');
    const { data, isLoading, error } = useGetAllStudentTimetable();

    const { facultyTimetableColumnConfig: columns } = FacultyTimetableColumnConfig();
    const table = useTableConfig({ data: data?.timetables, columns, globalFilter, setGlobalFilter, pageSize: 5 });

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
                            value={timetable}
                            onChange={setTimetable}
                            options={TIMETABLE_OPTIONS}
                            isOpen={activeSelect === 'year'}
                            toggleOpen={() => dispatch(toggleSelect('year'))}
                            onClose={() => dispatch(toggleSelect('year'))}
                        />

                        <SearchBar value={globalFilter} onChange={setGlobalFilter} placeholder='Search Subjects...' />
                    </div>
                </div>
                <div className='overflow-x-scroll font-secondary'>
                    <RenderListTable table={table} />
                </div>
                <TablePageination table={table} name={title} />
            </SlideUp>
        </>
    );
};
