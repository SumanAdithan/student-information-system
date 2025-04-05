import { FacultyInternalResultTable, ViewInternalResult } from '@components';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

export const FacultyInternalResultPage = () => {
    const facultyInternalResultPageConfig = {
        title: 'Internal Results',
    };

    const { view } = useSelector((state: RootState) => state.action);

    return (
        <>
            {view ? (
                <ViewInternalResult />
            ) : (
                <FacultyInternalResultTable title={facultyInternalResultPageConfig.title} />
            )}
        </>
    );
};
