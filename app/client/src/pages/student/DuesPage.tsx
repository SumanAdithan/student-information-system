import { Loading, ViewDues } from '@components';
import { useGetAuthenticatedDues } from '@queries';
import { AppDispatch, setDues } from '@store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const DuesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const dues = useGetAuthenticatedDues();
    const { data, isLoading, error } = dues;

    useEffect(() => {
        if (data) {
            dispatch(setDues(data.dues));
        }
    }, [dues, dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;

    return <ViewDues />;
};
