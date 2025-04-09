import {
    Category,
    categoryMap,
    DuesDetails,
    PayDuesSchemaType,
    RazorpayResponse,
    reverseCategoryMap,
    Transaction,
} from '@sis/types';
import { verifyPaymentSignature } from '@utils';
import Razorpay from 'razorpay';
import { DuesService } from './dues.service';
import { getDuesDataByRegisterNo } from '@models';

export class RazorpayService {
    private razorpayInstance;

    constructor() {
        this.razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_API_SECRET,
        });
    }

    async processPayment(orderData: PayDuesSchemaType) {
        try {
            const { name, registerNo, amount, category } = orderData;

            const options = {
                amount: amount * 100,
                currency: 'INR',
                receipt: `DUES_${Date.now()}`,
                notes: {
                    name,
                    registerNo,
                    amount,
                    category,
                },
            };

            const order = await this.razorpayInstance.orders.create(options);
            return { success: true, order };
        } catch (err) {
            console.error('Failed to create Razorpay order:', err);
            return { success: false, error: 'Unable to make payment' };
        }
    }

    async verifyPayment(RazorpayResponse: RazorpayResponse) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = RazorpayResponse;
        const verifyId = razorpay_order_id + '|' + razorpay_payment_id;
        const verifyPayment = verifyPaymentSignature(verifyId, razorpay_signature);
        if (!verifyPayment) return { success: false, transactionHistory: null, dues: null };

        const razorpayPayment = await this.razorpayInstance.payments.fetch(razorpay_payment_id);
        const { method, created_at, notes: dues } = razorpayPayment;

        const createdAt = new Date(created_at * 1000);
        const paidOn = createdAt.toLocaleString();

        const transactionHistory: Transaction = {
            transactionId: razorpay_payment_id,
            category: dues.category as Category,
            amount: parseInt(dues.amount),
            method,
            paidOn,
        };

        // const duesData = await DuesService.createTransactionHistory(parseInt(dues.registerNo), transactionHistory);

        return { success: true, transactionHistory, dues };
    }
}
