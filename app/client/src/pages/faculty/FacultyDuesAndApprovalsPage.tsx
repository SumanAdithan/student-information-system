import { FacultyDuesAndApprovalsTable, ViewDuesAndApprovals } from '@components';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

export const FacultyDuesAndApprovalsPage = () => {
    const facultyDuesAndApprovalsPageConfig = {
        title: 'Dues and Approvals',
    };

    const { view } = useSelector((state: RootState) => state.action);

    return (
        <>
            {view ? (
                <ViewDuesAndApprovals />
            ) : (
                <FacultyDuesAndApprovalsTable title={facultyDuesAndApprovalsPageConfig.title} />
            )}
        </>
    );
};
