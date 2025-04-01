import { createStudent, deleteStudentById, getAllStudentData, getStudentById, updateStudentById } from '@models';
import { Student, UpdateStudent } from '@sis/types';
import { ErrorHandler, getQrToken } from '@utils';
import { NextFunction } from 'express';
import QR from 'qrcode';
import { AwsService } from './aws.service';

const awsService = new AwsService();

export class StudentService {
    static async createStudent(student: Student, image: Express.Multer.File, next: NextFunction) {
        const password = [...student.registerNo.toString()].reverse().join();
        const studentData = {
            ...student,
            password,
        };

        const newStudent = await createStudent(studentData);

        if (image) {
            const profileImage = await awsService.uploadFile(
                'students',
                image.originalname,
                newStudent.id,
                image.buffer
            );
            if (!profileImage.success) return next(new ErrorHandler(400, 'Error while upload image'));
            newStudent.profileImage = profileImage.fileName;
        }

        const token = getQrToken(newStudent.id);
        const dataImage = await QR.toDataURL(token);
        newStudent.qrCode = dataImage;
        await newStudent.save();
    }

    static async getAllStudent() {
        return await getAllStudentData();
    }

    static async updateStudent(
        studentId: string,
        updatedItems: UpdateStudent,
        image: Express.Multer.File,
        next: NextFunction
    ) {
        const student = await getStudentById(studentId);
        if (!student) return next(new ErrorHandler(404, 'Student not found'));

        if (image) {
            const existingImageUrl = student.profileImage;
            if (existingImageUrl) {
                const existingImage = existingImageUrl.split('/').pop();
                const deleteImage = await awsService.deleteFile('students', existingImage);
                if (!deleteImage.success) return next(new ErrorHandler(400, 'Failed to delete'));
            }

            const profileImage = await awsService.uploadFile('students', image.originalname, student.id, image.buffer);
            if (!profileImage.success) return next(new ErrorHandler(400, 'Error while upload image'));
            updatedItems.profileImage = profileImage.fileName;
        }

        await updateStudentById(studentId, updatedItems);
    }

    static async deleteStudent(studentId: string, next: NextFunction) {
        const student = await getStudentById(studentId);
        if (!student) return next(new ErrorHandler(404, 'Student not found'));
        await deleteStudentById(studentId);
    }
}
