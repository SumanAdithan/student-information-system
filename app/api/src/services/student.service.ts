import {
    createStudent,
    deleteAssignmentByRegisterNo,
    deleteDuesByRegisterNo,
    deleteInternalResultByRegisterNo,
    deleteSemesterResultByRegisterNo,
    deleteStudentById,
    getAllStudentData,
    getStudentById,
    updateStudentById,
} from '@models';
import { Student, StudentWithId, UpdateStudent } from '@sis/types';
import { ErrorHandler, getQrToken, hashPassword } from '@utils';
import { NextFunction } from 'express';
import QR from 'qrcode';
import { AwsService } from './aws.service';
import { AssignDefaults } from './assignDefaults.service';

const awsService = new AwsService();
const assignDefaults = new AssignDefaults();

export class StudentService {
    static async createStudent(student: Student, image: Express.Multer.File) {
        let password = student.password;
        if (!password) {
            password = [...student.registerNo.toString()].reverse().join('');
        }

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
            newStudent.profileImage = profileImage.fileName;
        }

        const token = getQrToken(newStudent.id);
        // const dataImage = await QR.toDataURL(token);
        const hashedToken = await hashPassword(token);
        newStudent.qrCode = hashedToken;
        await newStudent.save();

        const defaultData = await assignDefaults.assignStudentDefaults(newStudent as StudentWithId);
        if (!defaultData.success) return { success: false };

        return { success: true };
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
        const student = await getStudentById(studentId).select('+password');
        if (!student) return next(new ErrorHandler(404, 'Student not found'));

        if (updatedItems.password) {
            updatedItems.password = await hashPassword(updatedItems.password);
        }

        if (image) {
            if (student.profileImage) {
                const deleteImage = await awsService.deleteFile(student.profileImage);
                if (!deleteImage.success) return next(new ErrorHandler(400, `Can't upload image`));
            }

            const profileImage = await awsService.uploadFile('students', image.originalname, student.id, image.buffer);
            if (!profileImage.success) return next(new ErrorHandler(400, `Can't upload image`));
            updatedItems.profileImage = profileImage.fileName;
        }

        await updateStudentById(studentId, updatedItems);
    }

    static async deleteStudent(studentId: string, next: NextFunction) {
        const student = await getStudentById(studentId);
        if (!student) return next(new ErrorHandler(404, 'Student not found'));
        if (student.profileImage) {
            const deleteImage = await awsService.deleteFile(student.profileImage);
            if (!deleteImage.success) return next(new ErrorHandler(400, `Can't delete Student`));
        }

        await deleteAssignmentByRegisterNo(student.registerNo);
        await deleteInternalResultByRegisterNo(student.registerNo);
        await deleteSemesterResultByRegisterNo(student.registerNo);
        await deleteDuesByRegisterNo(student.registerNo);
        await deleteStudentById(studentId);
    }

    static async downloadQrCode(studentId: string, next: NextFunction) {
        const student = await getStudentById(studentId);
        if (!student) return next(new ErrorHandler(404, 'Student not found'));

        const token = getQrToken(student.id);
        const dataImage = await QR.toDataURL(token);
        return { qrCode: dataImage, name: `${student.name}_(${student.registerNo})` };
    }
}
