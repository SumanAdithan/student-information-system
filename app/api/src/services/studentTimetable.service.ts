import { getStudentTimetableByYear } from '@models';

export class StudentTimetableService {
    static getAuthenticatedStudentTimetable(year: number) {
        return getStudentTimetableByYear(year);
    }
}
