import { useTableConfig } from '@hooks';
import { DuesColumn, DuesTableForm, RenderListTable } from '@components';
import { activePayBtn, edit, inActivePayBtn, tickMark, xMark } from '@assets';
import { RootState, setDues, setModal, setPayDues, toggleModal } from '@store';
import { useDispatch, useSelector } from 'react-redux';
import { resetDues } from '@api';

interface PayDuesTableProps {
    title: string;
    duesDetails: any;
    totalDetails: any;
}

export const PayDuesTable = ({ title, duesDetails, totalDetails }: PayDuesTableProps) => {
    const { duesColumnConfig: columns } = DuesColumn();
    const table = useTableConfig({ data: duesDetails, columns });
    const { editModal } = useSelector((state: RootState) => state.action);
    const { role } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch();

    const duesData = {
        name: totalDetails.name,
        registerNo: totalDetails.registerNo,
        year: totalDetails.year,
        category: 'Pending Fee',
        pending: totalDetails.previous_pending,
    };

    const handlePayClick = () => {
        dispatch(setPayDues(duesData));
        dispatch(setModal({ active: true, status: 'payPending' }));
    };

    const handleEditClick = () => {
        dispatch(setPayDues(duesData));
        dispatch(setModal({ active: true, status: 'editPending' }));
    };

    const handleReset = async () => {
        console.log('hi');
        const { dues } = await resetDues(duesData.registerNo);
        dispatch(setDues(dues));
    };

    return (
        <>
            <div className='bg-white backdrop-blur-md  p-6 pb-10 rounded-2xl shadow-section mb-7 overflow-hidden'>
                <div className='flex justify-between  mb-6 min-w-max gap-5 flex-col lg:items-center lg:flex-row'>
                    <h1 className='text-2xl font-medium mb-4 '>{title}</h1>
                    {role === 'admin' && (
                        <div>
                            <button className='text-white  bg-primary py-2 px-4 rounded-lg' onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    )}
                </div>
                <div className='overflow-x-scroll font-secondary'>
                    <RenderListTable table={table} />
                </div>
                <div className='w-full flex justify-around items-center text-md font-medium pt-8 px-10 border-t border-font-secondary '>
                    {role === 'admin' ? (
                        <div className='flex items-center gap-2'>
                            <h1 className='text-lg font-medium '>Previous : {totalDetails.previous_pending}</h1>
                            <img
                                src={edit}
                                alt='view'
                                className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                                onClick={handleEditClick}
                            />
                        </div>
                    ) : (
                        <div className='flex flex-col justify-center items-center '>
                            <h1 className='text-lg font-medium '>Previous : {totalDetails.previous_pending}</h1>
                            <button
                                onClick={handlePayClick}
                                disabled={totalDetails.previous_pending === 0 ? true : false}
                            >
                                <img
                                    src={totalDetails.previous_pending === 0 ? inActivePayBtn : activePayBtn}
                                    className='w-20'
                                    alt='pay'
                                />
                            </button>
                        </div>
                    )}
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
                {editModal.active && <DuesTableForm />}
            </div>
        </>
    );
};
