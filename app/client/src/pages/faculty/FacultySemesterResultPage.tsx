import { FacultySemesterResultTable, ViewSemesterResult } from '@components';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

export const FacultySemesterResultPage = () => {
    const facultySemesterResultPageConfig = {
        title: 'Semester Results',
    };

    const { view } = useSelector((state: RootState) => state.action);

    return (
        <>
            {view ? (
                <ViewSemesterResult />
            ) : (
                <FacultySemesterResultTable title={facultySemesterResultPageConfig.title} />
            )}
        </>
    );
};
