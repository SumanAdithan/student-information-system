import { getPaymentKey, processPayment, verifyPayment } from '@api';
import { logo } from '@assets';
import { PayDuesSchemaType, PaymentResponse } from '@sis/types';

export const handlePayment = async (orderData: PayDuesSchemaType) => {
    const paymentKey = await getPaymentKey();
    const order = await processPayment(orderData);

    const options = {
        key: paymentKey,
        currency: 'INR',
        name: 'MET ENGINEERING COLLEGE',
        description: 'Pay Dues',
        order_id: order.id,
        image: logo,
        handler: async (response: PaymentResponse) => {
            await verifyPayment(response);
        },
        prefill: {
            name: orderData.name,
        },
        theme: {
            color: '#00a6f4',
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};
