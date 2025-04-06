import { Loading, ViewSemesterResult } from '@components';
import { useGetAuthenticatedSemesterResult } from '@queries';
import { AppDispatch, setSemesterResult } from '@store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const SemesterResultPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const semesterResult = useGetAuthenticatedSemesterResult();
    const { data, isLoading, error } = semesterResult;

    useEffect(() => {
        if (data) {
            dispatch(setSemesterResult(data));
        }
    }, [semesterResult, dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;

    return <ViewSemesterResult />;
};
