import { customizeQrCode } from '@utils';
import { api } from './apiClient';
import { Faculty, UpdateFacultyDto } from '@sis/types';
import { saveAs } from 'file-saver';

export const getAllfacultiesData = async () => {
    const { data } = await api.get('/faculties');
    return {
        faculties: data.data,
    };
};

export const createNewFaculty = async ({ facultyData }: { facultyData: Faculty }) => {
    return await api.post('/faculty/new', facultyData);
};

export const updateFaculty = async ({
    facultyId,
    updatedFacultyData,
}: {
    facultyId: string;
    updatedFacultyData: UpdateFacultyDto;
}) => {
    return await api.patch(`/faculty/${facultyId}`, updatedFacultyData);
};

export const deleteFaculty = async ({ facultyId }: { facultyId: string }) => {
    return await api.delete(`/faculty/${facultyId}`);
};

export const downloadFacultyQrCode = async (facultyId: string) => {
    const {
        data: { data },
    } = await api.get(`/faculty/${facultyId}/qrcode`);

    const qrCodeBlob = await customizeQrCode({ base64: data.qrCode });
    saveAs(qrCodeBlob, `${data.name}.png`);
};
