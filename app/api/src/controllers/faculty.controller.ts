import { catchAsyncError } from '@middlewares';
import { createNewFacultyData } from '@models';
import { FacultyService } from '@services';
import { FacultyDto, UpdateFacultyDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';
import { request } from 'http';

export const getAuthenticatedFaculty = catchAsyncError(async (request, response, next) => {
    const { user } = request;
    if (!user) return next(new ErrorHandler(401, 'Unauthenticated'));

    successResponse(response, 200, user);
});

export const getAllFaculties = catchAsyncError(async (request, response, next) => {
    const faculties = await FacultyService.getAllFaculties();
    return successResponse(response, 200, faculties);
});

export const createFaculty = catchAsyncError(async (request: Request<FacultyDto>, response, next) => {
    const newfaculty = await FacultyService.createNewFaculty(request.body);
    return successResponse(response, 200);
});

export const insertFaculty = catchAsyncError(async (request, response, next) => {
    const { faculties } = request.body;
    Promise.all(
        faculties.map(async (faculty: any) => {
            await FacultyService.createNewFaculty(faculty);
        })
    );
    return successResponse(response, 200);
});

export const updateFaculty = catchAsyncError(
    async (request: Request<{ facultyId: string }, {}, UpdateFacultyDto>, response, next) => {
        const { facultyId } = request.params;
        const updatedFaculty = await FacultyService.updateFaculty(facultyId, request.body);
        return successResponse(response, 200);
    }
);

export const deleteFaculty = catchAsyncError(async (request: Request<{ facultyId: string }>, response, next) => {
    const { facultyId } = request.params;
    const deletedFaculty = await FacultyService.deleteFaculty(facultyId);
    return successResponse(response, 200);
});

export const downloadFacultyQrcode = catchAsyncError(
    async (request: Request<{ facultyId: string }>, response, next) => {
        const { facultyId } = request.params;
        const qrCode = await FacultyService.downloadQrCode(facultyId, next);
        successResponse(response, 200, qrCode);
    }
);
