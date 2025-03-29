import { api } from './apiClient';
import { Student } from '@sis/types';

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

export const createNewStudent = async (studentId: string, studentData: Student) => {
    await api.post(`/student/${studentId}`, studentData);
};
