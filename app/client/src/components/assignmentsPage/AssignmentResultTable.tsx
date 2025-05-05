import { useTableConfig } from '@hooks';
import { assignmentResultColumnConfig as columns } from './AssignmentResultColumn';
import { RenderResultTable } from '@components';
import { SlideUp } from '@ui';

interface AssignmentResultTableProps {
    title: string;
    results: any;
    initial: number;
    duration: number;
    delay?: number;
}

export const AssignmentResultTable = ({ title, results, initial, duration, delay = 0 }: AssignmentResultTableProps) => {
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
