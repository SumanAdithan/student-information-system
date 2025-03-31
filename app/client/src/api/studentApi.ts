import { api } from './apiClient';
import { Student, UpdateStudent } from '@sis/types';

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
    await api.post('/admin/student/new', studentData);
};

export const updateStudent = async ({
    studentId,
    updatedStudentData,
}: {
    studentId: string;
    updatedStudentData: UpdateStudent;
}) => {
    await api.patch(`/admin/student/${studentId}`, updatedStudentData);
};

export const deleteStudent = async ({ studentId }: { studentId: string }) => {
    await api.delete(`/admin/student/${studentId}`);
};
