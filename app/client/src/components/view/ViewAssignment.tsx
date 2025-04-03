import { AssignmentResultTable } from '@components';
import { RootState } from '@store';
import { getAssignmentResultData } from '@utils';
import { useSelector } from 'react-redux';

export const ViewAssignment = () => {
    const { assignmentResult, resultTitles } = useSelector((state: RootState) => state.assignment);
    const assignments = getAssignmentResultData(resultTitles, assignmentResult.results);

    return (
        <>
            {assignments.map((assignment: any, index: number) => (
                <AssignmentResultTable title={assignment.title} results={assignment.result} key={index} />
            ))}
        </>
    );
};
