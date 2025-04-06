import { PayDuesTable, TransactionHistoryTable } from '@components';
import { RootState } from '@store';
import { getDuesData } from '@utils';
import { useSelector } from 'react-redux';

export const ViewDues = () => {
    const payDuesConfig = {
        payDuesTitle: 'Pay Dues',
        transactionHistoryTitle: 'Transaction History',
    };
    const { dues } = useSelector((state: RootState) => state.dues);
    const { dues_details, total_details, transaction_history } = getDuesData(dues);

    return (
        <>
            <PayDuesTable title={payDuesConfig.payDuesTitle} duesDetails={dues_details} totalDetails={total_details} />
            <TransactionHistoryTable title={payDuesConfig.transactionHistoryTitle} data={transaction_history} />
        </>
    );
};
