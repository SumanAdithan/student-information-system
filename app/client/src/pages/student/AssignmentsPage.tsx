import { Loading, ViewAssignment } from '@components';
import { useGetAuthenticatedAssignment } from '@queries';
import { AppDispatch } from '@store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAssignment } from '@store';

export const AssignmentsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const assignment = useGetAuthenticatedAssignment();
    const { data, isLoading, error } = assignment;

    useEffect(() => {
        if (data) {
            dispatch(setAssignment(data));
        }
    }, [assignment, dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;

    return <ViewAssignment />;
};
