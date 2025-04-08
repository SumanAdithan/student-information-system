import {
    updateDuesData,
    getDuesDataByRegisterNo,
    getFilteredDuesData,
    updateOnlinePaymentData,
    createTransactionHistory,
    updateOfflinePaymentData,
} from '@models';
import { PayDuesSchemaType, QueryParams, Transaction, UpdateDues } from '@sis/types';

export class DuesService {
    static getDues(registerNo: number) {
        return getDuesDataByRegisterNo(registerNo);
    }

    static getAllDues(queryStr: QueryParams) {
        const filteredDuesData = getFilteredDuesData(queryStr);

        return filteredDuesData;
    }

    static updateDues(dues: UpdateDues) {
        return updateDuesData(dues);
    }

    static updateOnlinePayment(dues: PayDuesSchemaType) {
        console.log(dues);
        return updateOnlinePaymentData(dues);
    }

    static updateOfflinePayment(dues: PayDuesSchemaType) {
        return updateOfflinePaymentData(dues);
    }

    static createTransactionHistory(registerNo: number, transaction: Transaction) {
        return createTransactionHistory(registerNo, transaction);
    }
}
