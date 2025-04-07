import { useTableConfig } from '@hooks';
import { DuesColumn, RenderListTable } from '@components';
import { tickMark, xMark } from '@assets';

interface PayDuesTableProps {
    title: string;
    duesDetails: any;
    totalDetails: any;
}

export const PayDuesTable = ({ title, duesDetails, totalDetails }: PayDuesTableProps) => {
    const { duesColumnConfig: columns } = DuesColumn();
    const table = useTableConfig({ data: duesDetails, columns });

    return (
        <div className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7'>
            <h1 className='text-2xl font-medium mb-4'>{title}</h1>
            <div className='overflow-x-scroll font-secondary'>
                <RenderListTable table={table} />
            </div>
            <div className='w-full flex justify-around items-center text-md font-medium pt-8 px-10 border-t border-font-secondary '>
                <div>Total Amount: {totalDetails.total_amount}</div>
                <div>Paid Amount: {totalDetails.paid_amount}</div>
                <div>Pending Amount: {totalDetails.pending_amount}</div>
                <div className='flex items-center gap-2 '>
                    <span>50% Paid:</span>
                    <div>
                        {totalDetails.isPartial_paid ? (
                            <img src={tickMark} alt='true' className='w-3' />
                        ) : (
                            <img src={xMark} alt='false' className='w-3' />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
