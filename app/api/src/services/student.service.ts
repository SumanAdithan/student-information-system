import { createStudent, deleteStudentById, getAllStudentData, getStudentById, updateStudentById } from '@models';
import { Student, UpdateStudent } from '@sis/types';
import { ErrorHandler, getQrToken } from '@utils';
import { NextFunction } from 'express';
import QR from 'qrcode';

export class StudentService {
    static async createStudent(student: Student) {
        const password = [...student.registerNo.toString()].reverse().join();
        const studentData = {
            ...student,
            password,
        };

        const newStudent = await createStudent(studentData);

        const token = getQrToken(newStudent.id);
        const dataImage = await QR.toDataURL(token);
        newStudent.qrCode = dataImage;
        newStudent.save();
    }

    static async getAllStudent(includeCredentials = false) {
        if (!includeCredentials) return getAllStudentData();
        return await getAllStudentData().select('+password');
    }

    static async updateStudent(studentId: string, updatedItems: UpdateStudent, next: NextFunction) {
        const student = await getStudentById(studentId);
        if (!student) return next(new ErrorHandler(404, 'Student not found'));
        await updateStudentById(studentId, updatedItems);
    }

    static async deleteStudent(studentId: string, next: NextFunction) {
        const student = await getStudentById(studentId);
        if (!student) return next(new ErrorHandler(404, 'Student not found'));
        await deleteStudentById(studentId);
    }
}
