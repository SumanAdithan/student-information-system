import { DownloadNotesTable, Loading } from '@components';
import { useGetAllNotes } from '@queries';

export const DownloadNotesPage = () => {
    const downloadNotesConfig = {
        title: 'Notes',
    };

    const getAllNotes = useGetAllNotes();
    const { data, isLoading, error } = getAllNotes;

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching notes data</div>;
    return <DownloadNotesTable title={downloadNotesConfig.title} data={data?.notes} />;
};
