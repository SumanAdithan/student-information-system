import { useTableConfig } from '@hooks';
import { internalResultColumnConfig as columns } from './InternalResultColumn';
import { RenderResultTable } from '@components';

interface InternalResultTableProps {
    title: string;
    results: any;
}

export const InternalResultsTable = ({ title, results }: InternalResultTableProps) => {
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
