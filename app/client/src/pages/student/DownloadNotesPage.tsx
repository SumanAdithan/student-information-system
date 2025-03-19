import { DownloadNotesTable } from '@components';
import { downloadNotesData } from '@data';

export const DownloadNotesPage = () => {
    const downloadNotesConfig = {
        title: 'Notes',
    };
    return <DownloadNotesTable title={downloadNotesConfig.title} data={downloadNotesData.data} />;
};
