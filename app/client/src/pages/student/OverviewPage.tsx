import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store';
import { useEffect } from 'react';
import { useGetAuthenticatedStudent } from '@queries';
import { setStudent } from '@store';
import { Loading, ViewStudent } from '@components';

export const OverviewPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const student = useGetAuthenticatedStudent();
    const { data, isLoading, error } = student;

    useEffect(() => {
        if (data?.student) {
            dispatch(setStudent(data.student));
        }
    }, [data, dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;

    return <ViewStudent />;
};
