import { AppDispatch, RootState, toggleModal } from '@store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { FACULTY_TABLE_INPUT_FIELDS as inputFields } from '@constants';
import { InputField } from '@components';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Faculty, FacultySchema, FacultySubjectType, UpdateFacultyDto } from '@sis/types';
import { useChangedInputValues, useZodForm } from '@hooks';
import { useFacultyMutations } from '@queries';
import { FormProvider } from 'react-hook-form';
import { trash } from '@assets';

export const AdminFacultyTableForm = () => {
    const [subjectsDetails, setSubjectsDetails] = useState<FacultySubjectType[] | []>([]);
    const [facultySubjectsDetails, setFacultySubjectsDetails] = useState({ subjectName: '', code: '', year: '' });

    const methods = useZodForm(FacultySchema);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        control,
    } = methods;

    const { faculty, modal } = useSelector(
        (state: RootState) => ({
            faculty: state.faculty.faculty,
            modal: state.action.editModal,
        }),
        shallowEqual
    );

    const dispatch = useDispatch<AppDispatch>();
    const watchedValues = watch();

    const { createFacultyMutation, updateFacultyMutation } = useFacultyMutations();

    useEffect(() => {
        if (modal.status === 'edit' && faculty) {
            reset(faculty);
            setSubjectsDetails(faculty.subjects!);
        }
    }, [modal.active, reset]);

    const saveData = (data: Faculty) => {
        const changedFields = useChangedInputValues(faculty, watchedValues);
        if (modal.status === 'edit') {
            updateFacultyMutation.mutate({
                facultyId: faculty._id,
                updatedFacultyData: {
                    ...changedFields,
                    subjects: subjectsDetails,
                },
            });
        } else {
            createFacultyMutation.mutate({
                facultyData: {
                    ...data,
                    subjects: subjectsDetails,
                },
            });
        }
        dispatch(toggleModal());
    };

    const renderFacultySubjectsForm = () => {
        return (
            <div>
                <h1 className='text-lg font-medium mt-4'>Subjects Details</h1>
                <div className='flex items-center gap-2 mb-4'>
                    <input
                        type='text'
                        value={facultySubjectsDetails.subjectName}
                        name='subjectName'
                        onChange={(e) =>
                            setFacultySubjectsDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                        }
                        placeholder='Subject name...'
                        className='bg-search-input text-font-primary placeholder-font-primary rounded-lg pl-4 pr-4 py-2 w-[150px] sm:w-full  outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type='text'
                        value={facultySubjectsDetails.code}
                        name='code'
                        onChange={(e) =>
                            setFacultySubjectsDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                        }
                        placeholder='Subject code...'
                        className='bg-search-input text-font-primary placeholder-font-primary rounded-lg pl-4 pr-4 py-2 w-[150px] sm:w-full  outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type='text'
                        value={facultySubjectsDetails.year}
                        name='year'
                        onChange={(e) =>
                            setFacultySubjectsDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                        }
                        placeholder='Year...'
                        className='bg-search-input text-font-primary placeholder-font-primary rounded-lg pl-4 pr-4 py-2 w-[150px] sm:w-full  outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        type='button'
                        className='text-white  bg-primary py-2 px-4 rounded-lg'
                        onClick={() => {
                            setSubjectsDetails((prev) => [...prev, facultySubjectsDetails]);
                            setFacultySubjectsDetails({ subjectName: '', code: '', year: '' });
                        }}
                    >
                        Add
                    </button>
                </div>
                <ul>
                    {subjectsDetails.map((detail, index) => (
                        <li className='flex items-center gap-2 mt-2' key={index}>
                            <span>
                                {index + 1}. {detail.subjectName} ({detail.code}) - {detail.year}
                            </span>
                            <img
                                src={trash}
                                alt='delete'
                                className='w-4 h-4'
                                onClick={() => setSubjectsDetails((prev) => prev.filter((_, i) => i !== index))}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className='absolute inset-0 py-5 px-10 flex items-center justify-center bg-background-blur text-font-primary z-40 overflow-auto'>
            <div className='bg-white p-5 rounded-xl text-font-primary'>
                <h1 className='text-3xl font-semibold  mb-3 underline tracking-wider'>
                    {modal.status === 'edit' ? 'Edit Faculty' : 'Add Faculty'}
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
                    >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {inputFields.map((input) => (
                                <InputField
                                    key={input.name}
                                    data={input}
                                    register={register}
                                    control={control}
                                    error={errors[input.name as keyof UpdateFacultyDto]?.message as string}
                                />
                            ))}
                        </div>

                        {renderFacultySubjectsForm()}

                        <div className='md:col-start-2 flex justify-end items-center mt-5 space-x-2'>
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
