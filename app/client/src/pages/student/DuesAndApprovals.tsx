import { Loading, ViewDuesAndApprovals } from '@components';
import { useGetAuthenticatedDuesAndApprovals } from '@queries';
import { AppDispatch, setDuesAndApprovals } from '@store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const DuesAndApprovalsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const duesAndApprovals = useGetAuthenticatedDuesAndApprovals();
    const { data, isLoading, error } = duesAndApprovals;

    useEffect(() => {
        if (data) {
            dispatch(setDuesAndApprovals(data));
        }
    }, [duesAndApprovals, dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;

    return <ViewDuesAndApprovals />;
};
