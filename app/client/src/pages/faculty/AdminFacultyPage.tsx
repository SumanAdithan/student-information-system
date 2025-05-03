import { AdminFacultyTable, Loading, ViewFaculty } from '@components';
import { useGetAllFaculties } from '@queries';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

export const AdminFacultyPage = () => {
    const adminFacultyPageConfig = {
        title: 'Faculties',
    };

    const { view } = useSelector((state: RootState) => state.action);

    const getAllFaculties = useGetAllFaculties();
    const { data, isLoading, error } = getAllFaculties;

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching student data</div>;
    return (
        <>
            {view ? <ViewFaculty /> : <AdminFacultyTable title={adminFacultyPageConfig.title} data={data?.faculties} />}
        </>
    );
};
