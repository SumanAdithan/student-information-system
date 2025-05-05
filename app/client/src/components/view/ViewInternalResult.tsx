import { InternalResultsTable } from '@components';
import { RootState } from '@store';
import { getAssignmentResultData } from '@utils';
import { useSelector } from 'react-redux';

export const ViewInternalResult = () => {
    const { internalResult, resultTitles } = useSelector((state: RootState) => state.internalResult);
    const internalResultData = getAssignmentResultData(resultTitles, internalResult.results);

    const animation = [
        { initial: 30, duration: 1 },
        { initial: 25, duration: 0.5, delay: 0.2 },
        { initial: 25, duration: 0.6, delay: 0.5 },
        { initial: 25, duration: 0.7, delay: 0.7 },
    ];

    return (
        <>
            {internalResultData.map((assignment: any, index: number) => (
                <InternalResultsTable
                    title={assignment.title}
                    results={assignment.result}
                    key={index}
                    {...animation[index]}
                />
            ))}
        </>
    );
};
