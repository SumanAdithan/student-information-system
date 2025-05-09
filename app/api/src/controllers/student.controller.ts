import { catchAsyncError } from '@middlewares';
import { StudentService } from '@services';
import { Student, StudentDto, UpdateStudent, UpdateStudentDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { NextFunction, Request, Response } from 'express';

// Get Authenticated Student - api/v1/student
export const getAuthenticatedStudent = (request: Request, response: Response, next: NextFunction) => {
    const { user } = request;
    if (!user) return next(new ErrorHandler(401, 'Unauthenticated'));

    successResponse(response, 200, user);
};

// Get All Student - api/v1/students
export const getAllStudent = catchAsyncError(async (request, response, next) => {
    const students = await StudentService.getAllStudent();
    successResponse(response, 200, students);
});

// Admin: Create new Student - api/v1/admin/student/new
export const createNewStudent = catchAsyncError(async (request: Request<{}, {}, StudentDto>, response, next) => {
    const student = request.body as Student;
    const profileImage = request.file ? request.file : undefined;
    const createStudent = await StudentService.createStudent(student, profileImage);
    if (!createStudent.success) return next(new ErrorHandler(400, 'Unable to create a student'));
    successResponse(response, 201, null, 'Student Created');
});

// Admin: Update existing Student - api/v1/admin/student/:studentId
export const updateStudent = catchAsyncError(
    async (request: Request<{ studentId: string }, {}, UpdateStudentDto>, response, next) => {
        const { studentId } = request.params;
        const updatedItems = request.body as UpdateStudent;

        const profileImage = request.file ? request.file : undefined;
        await StudentService.updateStudent(studentId, updatedItems, profileImage, next);
        successResponse(response, 201, 'Student updated');
    }
);

// Admin: Delete existing Student - api/v1/admin/student/:studentId
export const deleteStudent = catchAsyncError(async (request: Request<{ studentId: string }>, response, next) => {
    const { studentId } = request.params;
    await StudentService.deleteStudent(studentId, next);
    successResponse(response, 201, null, 'Student deleted');
});

export const downloadStudentQrcode = catchAsyncError(
    async (request: Request<{ studentId: string }>, response, next) => {
        const { studentId } = request.params;
        const qrCode = await StudentService.downloadQrCode(studentId, next);
        successResponse(response, 200, qrCode);
    }
);
