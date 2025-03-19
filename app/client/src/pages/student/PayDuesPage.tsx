import { PayDuesTable, TransactionHistoryTable } from '@components';
import { payDuesData } from '@data';
import { getPayDuesData } from '@utils';

export const PayDuesPage = () => {
    const { transaction_history, dues_details, total_details } = getPayDuesData(payDuesData.data);
    const payDuesConfig = {
        payDuesTitle: 'Pay Dues',
        transactionHistoryTitle: 'Transaction History',
    };
    return (
        <>
            <PayDuesTable title={payDuesConfig.payDuesTitle} duesDetails={dues_details} totalDetails={total_details} />
            <TransactionHistoryTable title={payDuesConfig.transactionHistoryTitle} data={transaction_history} />
        </>
    );
};
