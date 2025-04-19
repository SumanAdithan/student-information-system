import { customizeQrCode, jsonToFormData } from '@utils';
import { api } from './apiClient';
import { Student, UpdateStudent } from '@sis/types';
import { saveAs } from 'file-saver';

export const getAuthenticatedStudent = async () => {
    const { data } = await api.get('/student');
    return {
        student: data.data,
    };
};

export const getAllStudentsData = async () => {
    const { data } = await api.get('/students');
    return {
        students: data.data,
    };
};

export const createNewStudent = async ({ studentData }: { studentData: Student }) => {
    const formData = jsonToFormData(studentData, ['profileImage']);
    return await api.post('/admin/student/new', formData);
};

export const updateStudent = async ({
    studentId,
    updatedStudentData,
}: {
    studentId: string;
    updatedStudentData: UpdateStudent;
}) => {
    const formData = jsonToFormData(updatedStudentData, ['profileImage']);
    return await api.patch(`/admin/student/${studentId}`, formData);
};

export const deleteStudent = async ({ studentId }: { studentId: string }) => {
    return await api.delete(`/admin/student/${studentId}`);
};

export const downloadStudentQrCode = async (studentId: string) => {
    const {
        data: { data },
    } = await api.get(`/admin/student/${studentId}/qrcode`);

    const qrCodeBlob = await customizeQrCode({ base64: data.qrCode });
    saveAs(qrCodeBlob, `${data.name}.png`);
};
