import { InternalResultsTable } from '@components';
import { internalResultData } from '@data';
import { getInternalResultData } from '@utils';

export const InternalResulsPage = () => {
    const { results } = internalResultData;
    const internalResultConfig = {
        resultTitles: [
            'First Internal Examination',
            'Second Internal Examination',
            'Third Internal Examination',
            'Sem Internal Marks',
        ],
    };
    const internalResults = getInternalResultData(internalResultConfig.resultTitles, results);
    return (
        <>
            {internalResults.map((assignment: any, index: number) => (
                <InternalResultsTable title={assignment.title} results={assignment.result} key={index} />
            ))}
        </>
    );
};
