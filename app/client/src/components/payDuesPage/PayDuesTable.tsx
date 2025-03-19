import { useTableConfig } from '@hooks';
import { RenderListTable, payDuesColumnConfig as columns } from '@components';

interface PayDuesTableProps {
    title: string;
    duesDetails: any;
    totalDetails: any;
}

export const PayDuesTable = ({ title, duesDetails, totalDetails }: PayDuesTableProps) => {
    const table = useTableConfig({ data: duesDetails, columns });
    return (
        <div className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7'>
            <h1 className='text-2xl font-medium mb-4'>{title}</h1>
            <div className='overflow-x-scroll font-secondary'>
                <RenderListTable table={table} />
            </div>
        </div>
    );
};
