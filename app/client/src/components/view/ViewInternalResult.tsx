import { InternalResultsTable } from '@components';
import { RootState } from '@store';
import { getAssignmentResultData } from '@utils';
import { useSelector } from 'react-redux';

export const ViewInternalResult = () => {
    const { internalResult, resultTitles } = useSelector((state: RootState) => state.internalResult);
    const internalResultData = getAssignmentResultData(resultTitles, internalResult.results);

    return (
        <>
            {internalResultData.map((assignment: any, index: number) => (
                <InternalResultsTable title={assignment.title} results={assignment.result} key={index} />
            ))}
        </>
    );
};
