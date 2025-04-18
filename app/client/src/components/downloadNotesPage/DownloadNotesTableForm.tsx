import { useZodForm } from '@hooks';
import { Notes, NotesSchemaClient } from '@sis/types';
import { DOWNLOAD_NOTES_TABLE_INPUT_FIELDS as inputFields } from '@constants';
import { AppDispatch, RootState, toggleModal } from '@store';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { InputField } from '@components';
import { X } from 'lucide-react';
import { useDownloadNotesMutation } from '@queries';

export const DownloadNotesTableForm = () => {
    const methods = useZodForm(NotesSchemaClient);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = methods;

    const { editModal } = useSelector((state: RootState) => state.action);
    const dispatch = useDispatch<AppDispatch>();
    const { addNotesMutation } = useDownloadNotesMutation();

    const saveData = (data: Notes) => {
        addNotesMutation.mutate({ notesData: data });
        dispatch(toggleModal());
    };

    return (
        <div className='absolute inset-0 py-5 px-10 flex items-center justify-center bg-background-blur text-font-primary z-40 overflow-auto'>
            <div className='bg-white p-5 rounded-xl text-font-primary'>
                <h1 className='text-3xl font-semibold  mb-3 underline tracking-wider'>
                    {editModal.status === 'edit' ? 'Edit Student' : 'Add Student'}
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
                                control={control}
                                error={errors[input.name as keyof Notes]?.message as string}
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
