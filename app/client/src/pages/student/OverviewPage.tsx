import { useDispatch } from 'react-redux';
import { AppDispatch, setProfile } from '@store';
import { useEffect } from 'react';
import { useGetAuthenticatedStudent } from '@queries';
import { setStudent } from '@store';
import { ViewStudent } from '@components';

export const OverviewPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const getStudent = useGetAuthenticatedStudent();
    const { data, isLoading, error } = getStudent;

    useEffect(() => {
        if (data?.student) {
            const { name, role, profileImage } = data.student;
            dispatch(setProfile({ name, role, profileImage }));
            dispatch(setStudent(data.student));
        }
    }, [data, dispatch]);

    console.log(data?.student);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching student data</div>;

    return <ViewStudent />;
};
