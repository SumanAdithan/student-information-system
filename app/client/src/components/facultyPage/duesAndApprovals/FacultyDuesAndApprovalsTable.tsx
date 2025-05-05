import { useTableConfig } from '@hooks';
import { FacultyDuesAndApprovalsColumn } from './FacultyDuesAndApprovalsColumn';
import { Loading, RenderListTable, SearchBar, Select, TablePageination } from '@components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, toggleSelect } from '@store';
import { useGetAllDuesAndApprovals } from '@queries';
import {
    DUES_AND_APPROVALS_ELIGIBLE_OPTIONS,
    DUES_AND_APPROVALS_FULLY_PAID_OPTIONS,
    DUES_AND_APPROVALS_PARTIAL_PAID_OPTIONS,
    YEAR_OPTIONS,
} from '@constants';
import { FacultyDuesAndApprovalsTableForm } from './FacultyDuesAndApprovalsTableForm';
import { SlideUp } from '@ui';

interface FacultyDuesAndApprovalsTableProps {
    title: string;
}

export const FacultyDuesAndApprovalsTable = ({ title }: FacultyDuesAndApprovalsTableProps) => {
    const dispatch = useDispatch<AppDispatch>();

    // state for filtering
    const [year, setYear] = useState(YEAR_OPTIONS[0].value);
    const [partialPaid, setPartialPaid] = useState(DUES_AND_APPROVALS_PARTIAL_PAID_OPTIONS[0].value);
    const [fullyPaid, setFullyPaid] = useState(DUES_AND_APPROVALS_FULLY_PAID_OPTIONS[0].value);
    const [eligible, setEligible] = useState(DUES_AND_APPROVALS_ELIGIBLE_OPTIONS[0].value);
    const [globalFilter, setGlobalFilter] = useState('');
    const { data, isLoading, error } = useGetAllDuesAndApprovals(year, partialPaid, fullyPaid, eligible);

    const { facultyDuesAndApprovalsColumnConfig: columns } = FacultyDuesAndApprovalsColumn();
    const table = useTableConfig({ data: data?.duesAndApprovals, columns, globalFilter, setGlobalFilter, pageSize: 5 });

    const { activeSelect } = useSelector((state: RootState) => state.layout);
    const { editModal } = useSelector((state: RootState) => state.action);

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
                            value={partialPaid}
                            onChange={setPartialPaid}
                            options={DUES_AND_APPROVALS_PARTIAL_PAID_OPTIONS}
                            isOpen={activeSelect === 'partialPaid'}
                            toggleOpen={() => dispatch(toggleSelect('partialPaid'))}
                            onClose={() => dispatch(toggleSelect('partialPaid'))}
                        />
                        <Select
                            value={fullyPaid}
                            onChange={setFullyPaid}
                            options={DUES_AND_APPROVALS_FULLY_PAID_OPTIONS}
                            isOpen={activeSelect === 'fullyPaid'}
                            toggleOpen={() => dispatch(toggleSelect('fullyPaid'))}
                            onClose={() => dispatch(toggleSelect('fullyPaid'))}
                        />
                        <Select
                            value={eligible}
                            onChange={setEligible}
                            options={DUES_AND_APPROVALS_ELIGIBLE_OPTIONS}
                            isOpen={activeSelect === 'eligible'}
                            toggleOpen={() => dispatch(toggleSelect('eligible'))}
                            onClose={() => dispatch(toggleSelect('eligible'))}
                        />

                        <SearchBar value={globalFilter} onChange={setGlobalFilter} placeholder='Search Subjects...' />
                    </div>
                </div>
                <div className='overflow-x-scroll font-secondary'>
                    <RenderListTable table={table} />
                </div>
                <TablePageination table={table} name={title} />
            </SlideUp>
            {editModal.active && <FacultyDuesAndApprovalsTableForm />}
        </>
    );
};
