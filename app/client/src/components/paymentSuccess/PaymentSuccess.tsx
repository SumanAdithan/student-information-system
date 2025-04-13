import { logo, success } from '@assets';
import { Transaction } from '@sis/types';
import { RefObject } from 'react';

export const PaymentSuccess = () =>
    // { studentData, transactionId, category, amount, method, paidOn }: Transaction,
    // ref: RefObject<HTMLDivElement>
    {
        return (
            <div className='bg-white shadow-section w-fit p-15 rounded-xl'>
                <div className='flex items-center gap-2'>
                    <div className='w-15 rounded-lg overflow-hidden'>
                        <img src={logo} alt='logo' />
                    </div>
                    <h1 className='text-3xl font-semibold'>MET ENGINEERING COLLEGE</h1>
                </div>

                <div className='mt-10 grid grid-cols-2 gap-5 text-lg font-medium'>
                    <p>Name: name</p>
                    <p>RegisterNo: RegisterNo</p>
                    <p>Semester:semester</p>
                    <p>Department:department</p>
                    <div>Year:year</div>
                    <p>Batch: batch</p>
                </div>

                <div className='mt-10'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <div className='w-20'>
                            <img src={success} alt='success' />
                        </div>
                        <h1 className='text-2xl font-medium text-success'>Payment Successfull</h1>
                    </div>
                    <div className='flex flex-col items-center mt-10 gap-5 text-lg font-medium'>
                        <p>Payment Id: id</p>
                        <p>amount</p>
                        <p>method</p>
                        <p>paid on</p>
                    </div>
                </div>
                <div className='mt-10 text-lg font-medium'>
                    Thanks you for your payment. Your payment was successfull
                </div>
            </div>
        );
    };
