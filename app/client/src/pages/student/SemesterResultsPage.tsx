import { SemesterResultTable } from '@components';
import { semesterResultData } from '@data';
import { getSemesterResultData } from '@utils';

export const SemesterResultsPage = () => {
    const { results } = semesterResultData;
    const semesterResultConfig = {
        resultTitles: [
            'First Semester',
            'Second Semester',
            'Third Semester',
            'Fourth Semester',
            'Fifth Semester',
            'Sixth Semester',
            'Seventh Semester',
            'Eighth Semester',
        ],
    };
    const semesterResults = getSemesterResultData(semesterResultConfig.resultTitles, results);
    return (
        <>
            {semesterResults.map((assignment: any, index: number) => (
                <SemesterResultTable title={assignment.title} results={assignment.result} key={index} />
            ))}
        </>
    );
};
