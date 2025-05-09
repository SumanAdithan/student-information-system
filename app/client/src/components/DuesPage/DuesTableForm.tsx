import { AppDispatch, RootState, setDues, toggleModal } from '@store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ONLINE_PAYMENT_TABLE_INPUT_FIELDS, OFFLINE_PAYMENT_TABLE_INPUT_FIELDS } from '@constants';
import { InputField } from '@components';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPayDuesSchema, PayDuesSchemaType } from '@sis/types';
import { useZodForm } from '@hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { useDuesMutation } from '@queries';
import { handlePayment } from '@utils';
import { processDuesPayment, processPendingPayment, verifyDuesPayment, verifyPendingPayment } from '@api';

export const DuesTableForm = () => {
    const { payDues, modal } = useSelector(
        (state: RootState) => ({
            payDues: state.dues.payDues,
            modal: state.action.editModal,
        }),
        shallowEqual
    );

    const inputFields =
        modal.status === 'edit' ? OFFLINE_PAYMENT_TABLE_INPUT_FIELDS : ONLINE_PAYMENT_TABLE_INPUT_FIELDS;

    const PayDuesSchema = createPayDuesSchema(1, payDues.pending);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useZodForm(PayDuesSchema);

    const methods = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const { updateOfflineDuesPaymentMutation, updateOfflinePendingPaymentMutation } = useDuesMutation();

    useEffect(() => {
        const { name, registerNo, category, pending, year } = payDues;
        if (modal.status === 'edit' && payDues) {
            reset({ name, registerNo, category, amount: 0, year });
        } else if (payDues) {
            reset({ name, registerNo, category, amount: pending, year });
        }
    }, [modal.active, reset]);

    const saveData = async (dues: PayDuesSchemaType) => {
        if (modal.status === 'editDues') {
            const data = await updateOfflineDuesPaymentMutation.mutateAsync(dues);
            dispatch(setDues(data.dues));
        } else if (modal.status === 'editPending') {
            const data = await updateOfflinePendingPaymentMutation.mutateAsync(dues);
            dispatch(setDues(data.dues));
        } else if (modal.status === 'payDues') {
            const options = {
                orderData: dues,
                processPayment: processDuesPayment,
                verifyPayment: verifyDuesPayment,
                dispatch,
            };
            handlePayment(options);
        } else if (modal.status === 'payPending') {
            const options = {
                orderData: dues,
                processPayment: processPendingPayment,
                verifyPayment: verifyPendingPayment,
                dispatch,
            };
            handlePayment(options);
        }

        dispatch(toggleModal());
    };

    return (
        <div className='absolute inset-0 py-5 px-10 flex items-center justify-center bg-background-blur text-font-primary z-40 overflow-auto'>
            <div className='bg-white p-5 rounded-xl text-font-primary'>
                <h1 className='text-3xl font-semibold  mb-3 underline tracking-wider'>
                    {modal.status === 'payDues' || 'payPending' ? 'Pay Dues' : 'Edit Dues'}
                </h1>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(saveData)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit(saveData)();
                            }
                        }}
                        className='grid grid-cols-1 md:grid-cols-2 gap-4'
                    >
                        {inputFields.map((input) => (
                            <InputField
                                key={input.name}
                                data={input}
                                register={register}
                                error={errors[input.name as keyof PayDuesSchemaType]?.message as string}
                            />
                        ))}

                        <div className='md:col-start-2 flex justify-end items-center mt-5 space-x-2'>
                            <button
                                className='bg-search-input hover:bg-font-secondary  px-4 py-3 rounded-md '
                                onClick={() => dispatch(toggleModal())}
                            >
                                <X size={22} />
                            </button>
                            <button
                                type='submit'
                                className='bg-primary text-font-primary font-bold text-lg px-4 py-2 rounded-md w-24 '
                            >
                                {modal.status === 'payDues' || 'payPending' ? 'Pay' : 'Save'}
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
