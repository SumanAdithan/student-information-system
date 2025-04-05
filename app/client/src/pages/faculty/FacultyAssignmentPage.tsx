import { FacultyAssignmentTable, ViewAssignment } from '@components';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

export const FacultyAssignmentPage = () => {
    const facultyStudentPageConfig = {
        title: 'Assignments',
    };

    const { view } = useSelector((state: RootState) => state.action);

    return <>{view ? <ViewAssignment /> : <FacultyAssignmentTable title={facultyStudentPageConfig.title} />}</>;
};
