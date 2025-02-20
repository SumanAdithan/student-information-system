import { catchAsyncError } from '@middlewares';
import { createStudent, deleteStudentByID, getAllStudents, getStudentByID, updateStudentByID } from '@models';
import { Student, StudentDTO, StudentDTOType } from '@sis/types';
import { ErrorHandler,assignDefaultData } from '@utils';
import { NextFunction, Request, Response } from 'express-serve-static-core';

// Get Students - /api/v1/students
export const getStudents = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const students = await getAllStudents();
    return res.status(200).json({
        success: true,
        students,
    });
});

// Create Student - /api/v1/student/new
export const newStudent = catchAsyncError(async (req: Request<{},{},StudentDTO>, res: Response, next: NextFunction) => {
    const student = StudentDTOType.safeParse(req.body);
    if(!student.success) {
        const error = student.error.format();
        console.error(error);
        return next(new ErrorHandler('Validation Failed',400));
    }
    const newStudent = await createStudent(student.data as Student);
    await assignDefaultData([newStudent])
    return res.status(201).json({
      success: true,
        newStudent,
   });
});

// Update Student - /api/v1/student/:id
export const updateStudent = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let student = await getStudentByID(req.params.id);
    if (!student) {
        return next(new ErrorHandler('Student not found', 404));
    }
    const updatedItems = req.body;
    student = await updateStudentByID(req.params.id, updatedItems);
    return res.status(200).json({
        success: true,
        student,
    });
});

// Delete Student - /api/v1/student/:id
export const deleteStudent = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let student = await getStudentByID(req.params.id);
    if (!student) {
        return next(new ErrorHandler('Student not found', 404));
    }
    student = await deleteStudentByID(req.params.id);
    return res.status(200).json({
        success: true,
    });
});
