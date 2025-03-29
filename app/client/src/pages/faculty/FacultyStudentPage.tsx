import { FacultyStudentTable } from '@components';
import { allStudents } from '@data';

export const FacultyStudentPage = () => {
    const facultyStudentPageConfig = {
        title: 'Students',
    };
    return (
        <>
            <FacultyStudentTable title={facultyStudentPageConfig.title} data={allStudents} />
        </>
    );
};
