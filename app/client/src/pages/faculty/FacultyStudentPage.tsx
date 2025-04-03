import { FacultyStudentTable, Loading, ViewStudent } from '@components';
import { useGetAllStudents } from '@queries';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

export const FacultyStudentPage = () => {
    const facultyStudentPageConfig = {
        title: 'Students',
    };

    const { view } = useSelector((state: RootState) => state.action);

    const getAllStudents = useGetAllStudents();
    const { data, isLoading, error } = getAllStudents;

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;
    return (
        <>
            {view ? (
                <ViewStudent />
            ) : (
                <FacultyStudentTable title={facultyStudentPageConfig.title} data={data?.students} />
            )}
        </>
    );
};
