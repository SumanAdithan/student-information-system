import { Loading, ViewTimetable } from '@components';
import { useGetAuthenticatedStudentTimetable } from '@queries';
import { AppDispatch, setTimetable } from '@store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const TimetablePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const timetable = useGetAuthenticatedStudentTimetable();
    const { data, isLoading, error } = timetable;

    useEffect(() => {
        if (data) {
            dispatch(setTimetable(data.timetable));
        }
    }, [timetable, dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;

    return <ViewTimetable />;
};
