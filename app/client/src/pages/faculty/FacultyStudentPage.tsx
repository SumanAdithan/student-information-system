import { FacultyStudentTable } from '@components';
import { useGetAllStudents } from '@queries';

export const FacultyStudentPage = () => {
    const facultyStudentPageConfig = {
        title: 'Students',
    };

    const getAllStudents = useGetAllStudents();
    const { data, isLoading, error } = getAllStudents;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching student data</div>;
    return (
        <>
            <FacultyStudentTable title={facultyStudentPageConfig.title} data={data?.students} />
        </>
    );
};
