import { jsonToFormData } from '@utils';
import { api } from './apiClient';
import { saveAs } from 'file-saver';
import { Circular } from '@sis/types';

export const getAllCircularData = async () => {
    const { data } = await api.get('/circulars');
    return {
        circulars: data.data,
    };
};

export const addCircular = async ({ circularData }: { circularData: Circular }) => {
    const formData = jsonToFormData(circularData, ['file']);
    return await api.post('/admin/circular/new', formData);
};

export const downloadCircularPdf = async (circularName: string) => {
    const { data, headers } = await api.get(`/file/circular/${circularName}`, {
        responseType: 'arraybuffer',
    });

    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    const fileName = headers['content-disposition'].split('filename=')[1].replace(/"/g, '');

    saveAs(pdfBlob, fileName);
};

export const deleteCircular = async ({ circularId }: { circularId: string }) => {
    return await api.delete(`/circular/${circularId}`);
};
