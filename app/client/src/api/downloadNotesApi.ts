import { jsonToFormData } from '@utils';
import { api } from './apiClient';
import { saveAs } from 'file-saver';
import { Notes } from '@sis/types';

export const getAllNotesData = async () => {
    const { data } = await api.get('/notes');
    return {
        notes: data.data,
    };
};

export const addNotes = async ({ notesData }: { notesData: Notes }) => {
    const formData = jsonToFormData(notesData, ['file']);
    return await api.post('/admin/notes/new', formData);
};

export const downloadNotesPdf = async (notesName: string) => {
    const { data, headers } = await api.get(`/file/notes/${notesName}`, {
        responseType: 'arraybuffer',
    });

    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    const fileName = headers['content-disposition'].split('filename=')[1].replace(/"/g, '');

    saveAs(pdfBlob, fileName);
};

export const deleteNotes = async ({ notesId }: { notesId: string }) => {
    return await api.delete(`/notes/${notesId}`);
};
