import { AdminFacultyTable, Loading, ViewFaculty } from '@components';
import { useGetAllFaculties, useGetAuthenticatedFaculty } from '@queries';
import { AppDispatch, RootState, setFaculty } from '@store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const FacultyOverviewPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const faculty = useGetAuthenticatedFaculty();
    const { data, isLoading, error } = faculty;

    useEffect(() => {
        if (data?.faculty) {
            dispatch(setFaculty(data.faculty));
        }
    }, [data, dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching faculty data</div>;

    return <ViewFaculty />;
};
