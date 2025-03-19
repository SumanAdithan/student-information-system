import { AssignmentResultTable } from '@components';
import { assignmentResultData } from '@data';
import { getAssignmentResultData } from '@utils';

export const AssignmentsPage = () => {
    const { results } = assignmentResultData;
    const assignmentResultConfig = {
        resultTitles: ['First Assignment', 'Second Assignment', 'Third Assignment'],
    };

    const assignments = getAssignmentResultData(assignmentResultConfig.resultTitles, results);

    return (
        <>
            {assignments.map((assignment: any, index: number) => (
                <AssignmentResultTable title={assignment.title} results={assignment.result} key={index} />
            ))}
        </>
    );
};
