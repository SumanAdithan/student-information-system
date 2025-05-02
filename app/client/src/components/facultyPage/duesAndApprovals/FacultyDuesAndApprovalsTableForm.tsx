import { AppDispatch, RootState, toggleModal } from '@store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { DUES_AND_APPROVALS_TABLE_INPUT_FIELDS as inputFields } from '@constants';
import { InputField } from '@components';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { DuesAndApprovals, DuesAndApprovalsDto, DuesAndApprovalsSchema } from '@sis/types';
import { useChangedInputValues, useZodForm } from '@hooks';
import { useDuesAndApprovalsMutation } from '@queries';
import { FormProvider, useForm } from 'react-hook-form';

export const FacultyDuesAndApprovalsTableForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useZodForm(DuesAndApprovalsSchema);

    const { duesAndApprovals, modal } = useSelector(
        (state: RootState) => ({
            duesAndApprovals: state.duesAndApprovals.editDuesAndApprovals,
            modal: state.action.editModal,
        }),
        shallowEqual
    );

    const methods = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const watchedValues = watch();

    const { updateDuesAndApprovalsMutation } = useDuesAndApprovalsMutation();

    useEffect(() => {
        if (modal.status === 'edit' && duesAndApprovals) {
            console.log(duesAndApprovals);
            reset(duesAndApprovals);
        }
    }, [modal.active, reset]);

    const saveData = () => {
        const changedFields = useChangedInputValues(duesAndApprovals, watchedValues);
        updateDuesAndApprovalsMutation.mutate({
            registerNo: duesAndApprovals?.registerNo!,
            updatedData: changedFields as DuesAndApprovals,
        });

        console.log(changedFields);

        dispatch(toggleModal());
    };

    return (
        <div className='absolute inset-0 py-5 px-10 flex items-center justify-center bg-background-blur text-font-primary z-40 overflow-auto'>
            <div className='bg-white p-5 rounded-xl text-font-primary'>
                <h1 className='text-3xl font-semibold  mb-3 underline tracking-wider'>
                    {modal.status === 'edit' ? 'Edit Student' : 'Add Student'}
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
                        className='grid grid-cols-1 md:grid-cols-3 gap-4'
                    >
                        {inputFields.map((input) => (
                            <InputField
                                key={input.name}
                                data={input}
                                register={register}
                                error={errors[input.name as keyof DuesAndApprovalsDto]?.message as string}
                            />
                        ))}

                        <div className='md:col-start-3 flex justify-end items-center mt-5 space-x-2'>
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
                                Save
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
