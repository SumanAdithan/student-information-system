export type PeriodType = {
    one: string;
    two: string;
    three: string;
    four: string;
    five: string;
    six: string;
};

export type TimetableDetailsType = {
    subjectName: string;
    code: string;
    staff?: string;
    class?: string;
};

export type TimetableType = {
    monday: PeriodType;
    tuesday: PeriodType;
    wednesday: PeriodType;
    thursday: PeriodType;
    friday: PeriodType;
};

export interface StudentTimetable {
    year: number;
    timetable: TimetableType;
    timetableDetails: [TimetableDetailsType];
}
