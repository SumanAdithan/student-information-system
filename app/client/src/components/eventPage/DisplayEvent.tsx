import { Event } from '@sis/types';
import { RootState, setModal } from '@store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventForm } from './EventForm';
import { LazyImage } from '@components';
import { trash } from '@assets';
import { useEventMutation } from '@queries';
import { SlideUp } from '@ui';
const apiUrl = import.meta.env.VITE_API_URL;

export const DisplayEvent = ({ events }: { events: (Event & { _id: string })[] }) => {
    const { editModal } = useSelector((state: RootState) => state.action);
    const { role } = useSelector((state: RootState) => state.profile);
    const { deleteEventMutation } = useEventMutation();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 1;

    const totalPages = Math.ceil(events.length / itemsPerPage);
    const currentData = events.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    };

    const setPageAfterDelete = () => {
        if (currentPage === 0 && events.length !== 0) {
            setCurrentPage(0);
        } else if (currentPage !== 0 && events.length !== 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <>
            <SlideUp className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7' initial={30} duration={1}>
                <div className='flex justify-between  mb-6 min-w-max gap-5 flex-col lg:items-center lg:flex-row'>
                    <h1 className='text-2xl font-medium'>Events</h1>
                    {role !== 'student' ? (
                        <div className='relative flex items-center gap-2 '>
                            <button
                                className='text-white  bg-primary py-2 px-4 rounded-lg duration-300 hover:scale-110'
                                onClick={() => dispatch(setModal({ active: true, status: 'add' }))}
                            >
                                Add
                            </button>
                        </div>
                    ) : null}
                </div>

                <div>
                    <div className='flex justify-center'>
                        {events.length === 0 ? (
                            <div>No Events available</div>
                        ) : (
                            <div>
                                <h1 className='text-2xl text-font-primary font-medium mb-2'>{currentData[0].name}</h1>
                                <LazyImage
                                    image={`${apiUrl}/file/event/${currentData[0].file}`}
                                    name='event'
                                    className='w-[700px] h-[400px]'
                                />
                                <p className='text-xl text-font-primary font-medium mt-2'>
                                    Register Here:{' '}
                                    <a
                                        href={currentData[0].registerLink}
                                        className='text-primary-dark'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        {currentData[0].registerLink}
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex flex-col md:flex-row justify-between mt-8 space-x-2 items-center'>
                    <div className='flex items-center'>
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 0}
                            className={`text-sm px-3 py-1 border-2 rounded-md bg-pageination-btn text-font-primary ${
                                currentPage === 0
                                    ? 'text-font-secondary border-none'
                                    : 'text-font-primary border-primary'
                            }`}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <span className='mx-2 text-sm font-medium text-font-primary'>
                            Page {currentPage + 1} of {events.length}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages - 1}
                            className={`text-sm px-3 py-1 border-2 bg-pageination-btn rounded-md ${
                                currentPage === totalPages - 1
                                    ? 'text-font-secondary border-none'
                                    : 'text-font-primary border-primary'
                            } `}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className='flex gap-4 text-md font-medium text-font-primary tracking-wider mt-5 md:mt-0'>
                        <div>Total: {events.length} events</div>
                        {role === 'admin' && (
                            <img
                                src={trash}
                                alt='delete'
                                className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                                onClick={() => {
                                    deleteEventMutation.mutate({ eventId: currentData[0]._id });
                                    setPageAfterDelete();
                                }}
                            />
                        )}
                    </div>
                </div>
            </SlideUp>
            {editModal.active && <EventForm />}
        </>
    );
};
