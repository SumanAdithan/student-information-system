export type PeriodType = {
    one: string;
    two: string;
    three: string;
    four: string;
    five: string;
    six: string;
};

export type StudentTimetableDetailsType = {
    subjectName: string;
    code: string;
    staff: string;
};

export interface StudentTimetable {
    year: number;
    timetable: {
        monday: PeriodType;
        tuesday: PeriodType;
        wednesday: PeriodType;
        thursday: PeriodType;
        friday: PeriodType;
    };
    timetableDetails: [StudentTimetableDetailsType];
}
