export interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export interface PayDues {
    registerNo: number;
    name: string;
    year: number;
    category: string;
    pending: number;
}
