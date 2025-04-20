import { StudentTimetable } from '@sis/types';
import { Schema, model } from 'mongoose';

const PeriodSchema = new Schema(
    {
        one: { type: String, default: '-' },
        two: { type: String, default: '-' },
        three: { type: String, default: '-' },
        four: { type: String, default: '-' },
        five: { type: String, default: '-' },
        six: { type: String, default: '-' },
    },
    { _id: false }
);

const TimetableDetailsSchema = new Schema({
    subjectName: { type: String },
    code: { type: String },
    staff: { type: String },
});

const TimetableSchema = new Schema({
    year: { type: Number, enum: { values: [1, 2, 3, 4] } },
    timetable: {
        monday: PeriodSchema,
        tuesday: PeriodSchema,
        wednesday: PeriodSchema,
        thursday: PeriodSchema,
        friday: PeriodSchema,
    },
    timetableDetails: [TimetableDetailsSchema],
});

const StudentTimetableModel = model('StudentTimetable', TimetableSchema);

export const createStudentTimetableData = (timeTable: StudentTimetable) => StudentTimetableModel.create(timeTable);
export const getStudentTimetableByYear = (year: number) => StudentTimetableModel.findOne({ year });
