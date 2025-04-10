import { logo, success } from '@assets';

export const PaymentSuccess = () => {
    return (
        <div className='bg-white shadow-section w-fit p-15 rounded-xl'>
            <div className='flex items-center gap-2'>
                <div className='w-15 rounded-lg overflow-hidden'>
                    <img src={logo} alt='logo' />
                </div>
                <h1 className='text-3xl font-semibold'>MET ENGINEERING COLLEGE</h1>
            </div>

            <div className='mt-10 grid grid-cols-2 gap-5 text-lg font-medium'>
                <p>Name: John</p>
                <p>RegisterNo: 961321104025</p>
                <p>Semester: 01</p>
                <p>Department: CSE</p>
                <div>Year: I</div>
                <p>Batch: 2021-2025</p>
            </div>

            <div className='mt-10'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='w-20'>
                        <img src={success} alt='success' />
                    </div>
                    <h1 className='text-2xl font-medium text-success'>Payment Successfull</h1>
                </div>
                <div className='flex flex-col items-center mt-10 gap-5 text-lg font-medium'>
                    <p>Payment Id: pay_182292998</p>
                    <p>Category: 2000</p>
                    <p>Method: UPI</p>
                    <p>Paid On: 12.2.1/10.10</p>
                </div>
            </div>
            <div className='mt-10 text-lg font-medium'>Thanks you for your payment. Your payment was successfull</div>
        </div>
    );
};
