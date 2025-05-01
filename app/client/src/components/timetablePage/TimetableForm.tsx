import { useChangedInputValues, useZodForm } from '@hooks';
import { TimetableDetailsType, TimetableSchema, TimetableType } from '@sis/types';
import { AppDispatch, RootState, toggleModal } from '@store';
import { TIMETABLE_INPUT_FIELDS as inputFields } from '@constants';
import { FormProvider, useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { InputField } from '@components';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { trash } from '@assets';

export const TimetableForm = () => {
    const { timetable, modal } = useSelector(
        (state: RootState) => ({
            timetable: state.timetable,
            modal: state.action.editModal,
        }),
        shallowEqual
    );

    const [timetableDetails, setTimetableDetails] = useState<TimetableDetailsType[]>([
        { subjectName: '', code: '', staff: '' },
    ]);
    const [timetableDetailsInput, setTimetableDetailsInput] = useState({ subjectName: '', code: '', staff: '' });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useZodForm(TimetableSchema);

    const methods = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const watchedValues = watch();

    useEffect(() => {
        if (modal.status === 'timetable' && timetable) {
            reset(timetable.editTimetable);
        } else {
            setTimetableDetails(timetable.editTimetableDetails);
        }
    }, [modal.active, reset]);

    const saveData = (data: any) => {
        console.log(data);
        const changedFields = useChangedInputValues(timetable, watchedValues);
        console.log(changedFields);
    };

    const renderTimetableDetailsForm = () => {
        return (
            <div>
                <div className='flex items-center gap-2 my-4'>
                    <input
                        type='text'
                        value={timetableDetailsInput.subjectName}
                        name='subjectName'
                        onChange={(e) =>
                            setTimetableDetailsInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                        }
                        placeholder='Subject name...'
                        className='bg-search-input text-font-primary placeholder-font-primary rounded-lg pl-4 pr-4 py-2 w-[150px] sm:w-full  outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type='text'
                        value={timetableDetailsInput.code}
                        name='code'
                        onChange={(e) =>
                            setTimetableDetailsInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                        }
                        placeholder='Subject code...'
                        className='bg-search-input text-font-primary placeholder-font-primary rounded-lg pl-4 pr-4 py-2 w-[150px] sm:w-full  outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type='text'
                        value={timetableDetailsInput.staff}
                        name='staff'
                        onChange={(e) =>
                            setTimetableDetailsInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                        }
                        placeholder='Staff...'
                        className='bg-search-input text-font-primary placeholder-font-primary rounded-lg pl-4 pr-4 py-2 w-[150px] sm:w-full  outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        className='text-white  bg-primary py-2 px-4 rounded-lg'
                        onClick={() => setTimetableDetails((prev) => [...prev, timetableDetailsInput])}
                    >
                        Add
                    </button>
                </div>
                <ul>
                    {timetableDetails.map((detail, index) => (
                        <li className='flex items-center gap-2 mt-2' key={index}>
                            <span>
                                {index + 1}. {detail.subjectName} ({detail.code}) - {detail.staff}
                            </span>
                            <img
                                src={trash}
                                alt='delete'
                                className='w-4 h-4'
                                onClick={() =>
                                    setTimetableDetails((prev) => prev.filter((item) => item.code !== detail.code))
                                }
                            />
                        </li>
                    ))}
                </ul>
                <div className='flex justify-end items-center mt-5 space-x-2'>
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
            </div>
        );
    };

    const renderTimetableForm = () => {
        return (
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(saveData)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit(saveData)();
                        }
                    }}
                    className='grid grid-cols-1 md:grid-cols-6 gap-4'
                >
                    {inputFields.map((input) => (
                        <InputField
                            key={input.name}
                            data={input}
                            register={register}
                            error={errors[input.name as keyof TimetableType]?.message as string}
                        />
                    ))}

                    <div className='md:col-start-6 flex justify-end items-center mt-5 space-x-2'>
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
        );
    };

    return (
        <div className='absolute inset-0 py-5 px-10 flex items-center justify-center bg-background-blur text-font-primary z-40 overflow-auto'>
            <div className='bg-white p-5 rounded-xl text-font-primary'>
                <h1 className='text-3xl font-semibold  mb-3 underline tracking-wider'>
                    Edit {modal.status === 'timetable' ? 'Timetable' : 'Timetable Details'}
                </h1>
                {modal.status === 'timetable' ? renderTimetableForm() : renderTimetableDetailsForm()}
            </div>
        </div>
    );
};
