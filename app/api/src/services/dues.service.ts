import {
    updateDuesData,
    getDuesDataByRegisterNo,
    getFilteredDuesData,
    updateOnlinePaymentData,
    createTransactionHistory,
    updateOfflinePaymentData,
    updatePreviousPending,
    getStudentByRegisterNo,
    resetDuesData,
} from '@models';
import {
    Category,
    DuesDetails,
    PayDuesSchemaType,
    RazorpayResponse,
    QueryParams,
    reverseCategoryMap,
    Transaction,
    UpdateDues,
} from '@sis/types';
import { RazorpayService } from './razorpay.service';

const razorpayService = new RazorpayService();

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

    static async processOnlineDuesPayment(dues: PayDuesSchemaType) {
        const { name, registerNo, amount, category: duesCategory } = dues;

        const duesData = await getDuesDataByRegisterNo(registerNo);
        const category = reverseCategoryMap[duesCategory as Category];
        if (!category) return { success: false, error: 'Invalid fee category' };

        const pendingAmount = duesData.dues_details[category as keyof DuesDetails]?.pending ?? 0;
        if (amount > pendingAmount) {
            return {
                success: false,
                error: `Amount exceeds pending dues. Max allowed: ₹${pendingAmount}`,
            };
        }

        const processPayment = await razorpayService.processPayment(dues);
        if (!processPayment.success) return { success: false, error: 'unable to make a payment' };
        return { success: true, order: processPayment.order };
    }

    static async verifyOnlineDuesPayment(razorpayResponse: RazorpayResponse) {
        const verifyPayment = await razorpayService.verifyPayment(razorpayResponse);
        if (!verifyPayment.success) return { success: false, error: 'invalid payment' };

        const { transaction, dues } = verifyPayment;
        const student = await getStudentByRegisterNo(parseInt(dues.registerNo));
        const studentData = {
            name: student.name,
            registerNo: student.registerNo,
            semester: student.semester,
            department: student.department,
            year: student.year,
            batch: student.batch,
        };
        const transactionHistory = {
            studentData,
            ...transaction,
        };

        console.log(transactionHistory);

        await createTransactionHistory(parseInt(dues.registerNo), transactionHistory);
        const duesData = await updateOnlinePaymentData(dues);
        return { success: true, duesData };
    }

    static async processOnlinePendingPayment(dues: PayDuesSchemaType) {
        const { name, registerNo, amount, category: duesCategory } = dues;

        const duesData = await getDuesDataByRegisterNo(registerNo);
        const pendingAmount = duesData.total_details.pending_amount;
        if (amount > pendingAmount) {
            return {
                success: false,
                error: `Amount exceeds pending dues. Max allowed: ₹${pendingAmount}`,
            };
        }

        const processPayment = await razorpayService.processPayment(dues);
        if (!processPayment.success) return { success: false, error: 'unable to make a payment' };

        return { success: true, order: processPayment.order };
    }

    static async verifyOnlinePendingPayment(razorpayResponse: RazorpayResponse) {
        const verifyPayment = await razorpayService.verifyPayment(razorpayResponse);
        if (!verifyPayment.success) return { success: false, error: 'invalid payment' };

        const { transaction, dues } = verifyPayment;
        const student = await getStudentByRegisterNo(parseInt(dues.registerNo));
        const studentData = {
            name: student.name,
            registerNo: student.registerNo,
            semester: student.semester,
            department: student.department,
            year: student.year,
            batch: student.batch,
        };
        const transactionHistory = {
            ...studentData,
            ...transaction,
        };

        await createTransactionHistory(parseInt(dues.registerNo), transactionHistory);
        const duesData = await updatePreviousPending(dues);

        return { success: true, duesData };
    }

    static updateOfflineDuesPayment(dues: PayDuesSchemaType) {
        return updateOfflinePaymentData(dues);
    }

    static updateOfflinePendingPayment(dues: PayDuesSchemaType) {
        return updatePreviousPending(dues);
    }

    static resetDues(registerNo: number) {
        return resetDuesData(registerNo);
    }
}
