import { getPaymentKey } from '@api';
import { logo } from '@assets';
import { PayDuesSchemaType, RazorpayResponse } from '@sis/types';
import { AppDispatch, setDues } from '@store';

interface HandlePaymentProps {
    orderData: PayDuesSchemaType;
    processPayment: (orderData: PayDuesSchemaType) => Promise<any>;
    verifyPayment: (response: RazorpayResponse) => Promise<any>;
    dispatch: AppDispatch;
}

export const handlePayment = async ({ orderData, processPayment, verifyPayment, dispatch }: HandlePaymentProps) => {
    const paymentKey = await getPaymentKey();
    const order = await processPayment(orderData);

    const options = {
        key: paymentKey,
        currency: 'INR',
        name: 'MET ENGINEERING COLLEGE',
        description: 'Pay Dues',
        order_id: order.id,
        image: logo,
        handler: async (response: RazorpayResponse) => {
            const { dues } = await verifyPayment(response);
            dispatch(setDues(dues));
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
