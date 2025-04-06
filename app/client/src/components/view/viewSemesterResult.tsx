import { SemesterResultTable } from '@components';
import { RootState } from '@store';
import { getSemesterResultData } from '@utils';
import { useSelector } from 'react-redux';

export const ViewSemesterResult = () => {
    const { semesterResult, resultTitles } = useSelector((state: RootState) => state.semesterResult);
    const semesterResultData = getSemesterResultData(resultTitles, semesterResult.results);

    return (
        <>
            {semesterResultData.map((assignment: any, index: number) => (
                <SemesterResultTable title={assignment.title} results={assignment.result} key={index} />
            ))}
        </>
    );
};
