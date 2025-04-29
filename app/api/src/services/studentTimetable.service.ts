import { getAllStudentTimetableData, getStudentTimetableByYear, updateStudentTimetableData } from '@models';

export class StudentTimetableService {
    static getAuthenticatedStudentTimetable(year: number) {
        return getStudentTimetableByYear(year);
    }

    static getAllStudentTimetable() {
        return getAllStudentTimetableData();
    }

    static updateStudentTimetable(year: number, updatedItems: any) {
        return updateStudentTimetableData(year, updatedItems);
    }
}
