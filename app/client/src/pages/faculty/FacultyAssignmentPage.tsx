import { FacultyAssignmentTable, Loading, ViewAssignment } from '@components';
import { useGetAllAssignment } from '@queries';
import { RootState } from '@store';
import { useSelector } from 'react-redux';
import { getAssignmentTableData } from '@utils';
import { AssignmentResult } from '@sis/types';

export const FacultyAssignmentPage = () => {
    const facultyStudentPageConfig = {
        title: 'Assignments',
    };

    const { view } = useSelector((state: RootState) => state.action);

    const assignments = useGetAllAssignment();
    const { data, isLoading, error } = assignments;

    const assignmentTableData = data?.assignments ? getAssignmentTableData(data.assignments) : [];

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;
    return (
        <>
            {view ? (
                <ViewAssignment />
            ) : (
                <FacultyAssignmentTable title={facultyStudentPageConfig.title} data={assignmentTableData} />
            )}
        </>
    );
};
