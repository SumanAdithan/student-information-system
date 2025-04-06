import { ErrorHandler, verifyPaymentSignature } from '@utils';
import Razorpay from 'razorpay';

export class RazorpayService {
    private razorpayInstance;

    constructor() {
        this.razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_API_SECRET,
        });
    }

    async processPayment(amount: number, receiptId: string) {
        try {
            const options = {
                amount: amount * 100,
                currency: 'INR',
                receipt: receiptId,
            };

            const order = await this.razorpayInstance.orders.create(options);
            return { success: true, order };
        } catch (err) {
            console.error('Failed to create Razorpay order:', err);
            return { success: false, error: 'Unable to make payment' };
        }
    }

    async verifyPayment(paymentId: string, orderId: string, signature: string) {
        const verifyId = orderId + '|' + paymentId;
        const verifyPayment = verifyPaymentSignature(verifyId, signature);
        if (!verifyPayment) throw new ErrorHandler(400, 'Invalid Payment');
    }
}
