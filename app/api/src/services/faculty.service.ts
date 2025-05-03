import {
    getAllFacultiesData,
    updateFaculyData,
    createNewFacultyData,
    deleteFacultyData,
    getFacultyById,
} from '@models';
import QR from 'qrcode';
import { Faculty, UpdateFacultyDto } from '@sis/types';
import { ErrorHandler, getQrToken, hashPassword } from '@utils';
import { NextFunction } from 'express';

export class FacultyService {
    static async getAllFaculties() {
        return getAllFacultiesData();
    }

    static async createNewFaculty(faculty: Faculty) {
        let password = faculty.password;
        if (!password) {
            password = `${faculty.name}@MetCSE`;
        }

        const facultyData = {
            ...faculty,
            password,
        };

        const newFaculty = await createNewFacultyData(facultyData);

        const token = getQrToken(newFaculty.id);
        const hashedToken = await hashPassword(token);
        newFaculty.qrCode = hashedToken;

        await newFaculty.save();

        return;
    }

    static async updateFaculty(facultyId: string, updatedFacultyData: UpdateFacultyDto) {
        return updateFaculyData(facultyId, updatedFacultyData);
    }

    static async deleteFaculty(facultyId: string) {
        return deleteFacultyData(facultyId);
    }

    static async downloadQrCode(facultyId: string, next: NextFunction) {
        const faculty = await getFacultyById(facultyId);
        if (!faculty) return next(new ErrorHandler(404, 'Faculty not found'));

        const token = getQrToken(faculty.id);
        const dataImage = await QR.toDataURL(token);
        return { qrCode: dataImage, name: `${faculty.name}_${faculty.position}` };
    }
}
