import { jsonToFormData } from '@utils';
import { api } from './apiClient';
import { saveAs } from 'file-saver';
import { Event } from '@sis/types';

export const getAllEventData = async () => {
    const { data } = await api.get('/events');
    return {
        events: data.data,
    };
};

export const addEvent = async ({ eventData }: { eventData: Event }) => {
    const formData = jsonToFormData(eventData, ['file']);
    return await api.post('/admin/event/new', formData);
};

export const downloadEventPdf = async (eventName: string) => {
    const { data, headers } = await api.get(`/file/event/${eventName}`, {
        responseType: 'arraybuffer',
    });

    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    const fileName = headers['content-disposition'].split('filename=')[1].replace(/"/g, '');

    saveAs(pdfBlob, fileName);
};

export const deleteEvent = async ({ eventId }: { eventId: string }) => {
    return await api.delete(`/event/${eventId}`);
};
