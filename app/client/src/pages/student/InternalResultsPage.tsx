import { Loading, ViewInternalResult } from '@components';
import { useGetAuthenticatedInternalResult } from '@queries';
import { AppDispatch, setInternalResult } from '@store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const InternalResultPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const internalResult = useGetAuthenticatedInternalResult();
    const { data, isLoading, error } = internalResult;

    useEffect(() => {
        if (data) {
            dispatch(setInternalResult(data));
        }
    }, [internalResult, dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;

    return <ViewInternalResult />;
};
