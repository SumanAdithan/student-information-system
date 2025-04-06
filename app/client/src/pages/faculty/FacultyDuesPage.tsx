import { FacultyDuesTable, ViewDues } from '@components';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

export const FacultyDuesPage = () => {
    const facultyDuesPageConfig = {
        title: 'Dues',
    };

    const { view } = useSelector((state: RootState) => state.action);

    return <>{view ? <ViewDues /> : <FacultyDuesTable title={facultyDuesPageConfig.title} />}</>;
};
