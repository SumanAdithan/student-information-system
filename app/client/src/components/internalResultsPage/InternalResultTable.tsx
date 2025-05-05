import { useTableConfig } from '@hooks';
import { internalResultColumnConfig as columns } from './InternalResultColumn';
import { RenderResultTable } from '@components';
import { SlideUp } from '@ui';

interface InternalResultTableProps {
    title: string;
    results: any;
    initial: number;
    duration: number;
    delay?: number;
}

export const InternalResultsTable = ({ title, results, initial, duration, delay = 0 }: InternalResultTableProps) => {
    const table = useTableConfig({ data: results, columns });
    return (
        <SlideUp
            className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7'
            initial={initial}
            duration={duration}
            delay={delay}
        >
            <h1 className='text-2xl font-medium mb-4'>{title}</h1>
            <div className='rounded-2xl border bg-clip-border overflow-x-scroll font-secondary'>
                <RenderResultTable table={table} />
            </div>
        </SlideUp>
    );
};
