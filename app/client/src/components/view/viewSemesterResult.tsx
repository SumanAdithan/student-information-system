import { SemesterResultTable } from '@components';
import { RootState } from '@store';
import { getSemesterResultData } from '@utils';
import { useSelector } from 'react-redux';

export const ViewSemesterResult = () => {
    const { semesterResult, resultTitles } = useSelector((state: RootState) => state.semesterResult);
    const semesterResultData = getSemesterResultData(resultTitles, semesterResult.results);

    const animation = [
        { initial: 30, duration: 1 },
        { initial: 25, duration: 0.5, delay: 0.2 },
        { initial: 25, duration: 0.6, delay: 0.5 },
        { initial: 25, duration: 0.7, delay: 0.7 },
        { initial: 25, duration: 0.8, delay: 0.9 },
        { initial: 25, duration: 0.9, delay: 1.1 },
        { initial: 25, duration: 1, delay: 1.3 },
        { initial: 25, duration: 1.1, delay: 1.5 },
    ];

    return (
        <>
            {semesterResultData.map((assignment: any, index: number) => (
                <SemesterResultTable
                    title={assignment.title}
                    results={assignment.result}
                    key={index}
                    {...animation[index]}
                />
            ))}
        </>
    );
};
