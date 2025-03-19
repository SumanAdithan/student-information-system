import { useTableConfig } from '@hooks';
import { assignmentResultColumnConfig as columns } from './AssignmentResultColumn';
import { RenderResultTable } from '@components';

interface AssignmentResultTableProps {
    title: string;
    results: any;
}

export const AssignmentResultTable = ({ title, results }: AssignmentResultTableProps) => {
    const table = useTableConfig({ data: results, columns });
    return (
        <div className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7'>
            <h1 className='text-2xl font-medium mb-4'>{title}</h1>
            <div className='rounded-2xl border bg-clip-border overflow-x-scroll font-secondary'>
                <RenderResultTable table={table} />
            </div>
        </div>
    );
};
