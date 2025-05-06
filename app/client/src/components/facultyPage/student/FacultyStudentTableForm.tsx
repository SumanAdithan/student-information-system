import { AppDispatch, RootState, toggleModal } from '@store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { STUDENT_TABLE_INPUT_FIELDS as inputFields } from '@constants';
import { InputField } from '@components';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { Student, StudentDto, StudentSchema } from '@sis/types';
import { useChangedInputValues, useZodForm } from '@hooks';
import { useStudentMutations } from '@queries';
import { FormProvider, useForm } from 'react-hook-form';

export const FacultyStudentTableForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        control,
    } = useZodForm(StudentSchema, {
        profileImage: '',
    });

    const { student, modal } = useSelector(
        (state: RootState) => ({
            student: state.student.student,
            modal: state.action.editModal,
        }),
        shallowEqual
    );

    const methods = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const watchedValues = watch();

    const { createStudentMutation, updateStudentMutation } = useStudentMutations();

    useEffect(() => {
        if (modal.status === 'edit' && student) {
            reset(student as StudentDto);
        }
    }, [modal.active, reset]);

    const saveData = (data: StudentDto) => {
        const changedFields = useChangedInputValues(student, watchedValues);
        if (modal.status === 'edit' && changedFields) {
            updateStudentMutation.mutate({
                studentId: student._id,
                updatedStudentData: changedFields,
            });
        } else {
            createStudentMutation.mutate({ studentData: data as Student });
        }
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
                        className='grid grid-cols-1 md:grid-cols-4 gap-4'
                    >
                        {inputFields.map((input) => (
                            <InputField
                                key={input.name}
                                data={input}
                                register={register}
                                control={control}
                                error={errors[input.name as keyof Student]?.message as string}
                            />
                        ))}

                        <div className='flex justify-end items-center mt-5 space-x-2'>
                            <button
                                className='bg-search-input hover:bg-font-secondary  px-4 py-2 rounded-md '
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
