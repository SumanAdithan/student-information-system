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
    updateDuesAndApprovalsDefault,
    updateStudentDues,
} from '@models';
import {
    Category,
    DuesDetails,
    PayDuesSchemaType,
    RazorpayResponse,
    QueryParams,
    reverseCategoryMap,
    UpdateDues,
} from '@sis/types';
import { RazorpayService } from './razorpay.service';
import { PaymentReceiptService } from './paymentReceipt.service';
import { getPaymentReceiptName } from '@utils';

const razorpayService = new RazorpayService();

export class DuesService {
    static getDues(registerNo: number) {
        return getDuesDataByRegisterNo(registerNo);
    }

    static getAllDues(queryStr: QueryParams) {
        const filteredDuesData = getFilteredDuesData(queryStr);

        return filteredDuesData;
    }

    static async updateDues(dues: UpdateDues) {
        const duesData = await updateDuesData(dues);
        await updateDuesAndApprovalsDefault(duesData.registerNo, {
            pending: duesData.total_details.pending_amount,
            isPartialPaid: duesData.total_details.isPartial_paid,
        });

        await updateStudentDues(duesData.registerNo, { dues: duesData.total_details.pending_amount });

        return duesData;
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

        await createTransactionHistory(parseInt(dues.registerNo), transactionHistory);

        const duesData = await updateOnlinePaymentData(dues);
        await updateDuesAndApprovalsDefault(parseInt(dues.registerNo), {
            pending: duesData.total_details.pending_amount,
            isPartialPaid: duesData.total_details.isPartial_paid,
        });
        await updateStudentDues(parseInt(dues.registerNo), { dues: duesData.total_details.pending_amount });

        const paymentReceiptName = getPaymentReceiptName(
            transactionHistory.studentData.name,
            transactionHistory.paidOn
        );
        const paymentReceipt = await PaymentReceiptService.generateReceipt(transactionHistory);
        return { success: true, paymentReceipt, paymentReceiptName };
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
            studentData,
            ...transaction,
        };

        await createTransactionHistory(parseInt(dues.registerNo), transactionHistory);

        const duesData = await updatePreviousPending(dues);
        await updateDuesAndApprovalsDefault(parseInt(dues.registerNo), {
            pending: duesData.total_details.pending_amount,
            isPartialPaid: duesData.total_details.isPartial_paid,
        });
        await updateStudentDues(parseInt(dues.registerNo), { dues: duesData.total_details.pending_amount });

        const paymentReceiptName = getPaymentReceiptName(
            transactionHistory.studentData.name,
            transactionHistory.paidOn
        );
        const paymentReceipt = await PaymentReceiptService.generateReceipt(transactionHistory);
        return { success: true, paymentReceipt, paymentReceiptName };
    }

    static async updateOfflineDuesPayment(dues: PayDuesSchemaType) {
        const duesData = await updateOfflinePaymentData(dues);

        await updateDuesAndApprovalsDefault(duesData.registerNo, {
            pending: duesData.total_details.pending_amount,
            isPartialPaid: duesData.total_details.isPartial_paid,
        });

        await updateStudentDues(duesData.registerNo, { dues: duesData.total_details.pending_amount });

        return duesData;
    }

    static async updateOfflinePendingPayment(dues: PayDuesSchemaType) {
        const duesData = await updatePreviousPending(dues);

        await updateDuesAndApprovalsDefault(duesData.registerNo, {
            pending: duesData.total_details.pending_amount,
            isPartialPaid: duesData.total_details.isPartial_paid,
        });

        await updateStudentDues(duesData.registerNo, { dues: duesData.total_details.pending_amount });

        return duesData;
    }

    static async resetDues(registerNo: number) {
        const duesData = await resetDuesData(registerNo);
        await updateDuesAndApprovalsDefault(duesData.registerNo, {
            pending: duesData.total_details.pending_amount,
            isPartialPaid: duesData.total_details.isPartial_paid,
        });

        await updateStudentDues(duesData.registerNo, { dues: duesData.total_details.pending_amount });

        return duesData;
    }
}
