import { AssignmentResultTable } from '@components';
import { RootState } from '@store';
import { getAssignmentResultData } from '@utils';
import { useSelector } from 'react-redux';

export const ViewAssignment = () => {
    const { assignmentResult, resultTitles } = useSelector((state: RootState) => state.assignment);
    const assignments = getAssignmentResultData(resultTitles, assignmentResult.results);

    const animation = [
        { initial: 30, duration: 1 },
        { initial: 25, duration: 0.5, delay: 0.2 },
        { initial: 25, duration: 0.6, delay: 0.5 },
    ];

    return (
        <>
            {assignments.map((assignment: any, index: number) => (
                <AssignmentResultTable
                    title={assignment.title}
                    results={assignment.result}
                    key={index}
                    {...animation[index]}
                />
            ))}
        </>
    );
};
