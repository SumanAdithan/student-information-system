import { catchAsyncError } from '@middlewares';
import { StudentService } from '@services';
import { Student, UpdateStudent } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { NextFunction, Request, RequestHandler, Response } from 'express';

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
export const createNewStudent = catchAsyncError(async (request, response) => {
    const student = request.body as Student;
    await StudentService.createStudent(student);
    successResponse(response, 201, null, 'Student Created');
});

// Admin: Update existing Student - api/v1/admin/student/:studentId
export const updateStudent = catchAsyncError(async (request: Request<{ studentId: string }>, response, next) => {
    const { studentId } = request.params;
    const updatedItems = request.body as UpdateStudent;
    await StudentService.updateStudent(studentId, updatedItems, next);
    successResponse(response, 201, 'Student updated');
});

// Admin: Delete existing Student - api/v1/admin/student/:studentId
export const deleteStudent = catchAsyncError(async (request: Request<{ studentId: string }>, response, next) => {
    const { studentId } = request.params;
    await StudentService.deleteStudent(studentId, next);
    successResponse(response, 201, 'Student deleted');
});
