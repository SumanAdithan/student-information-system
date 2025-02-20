import mongoose from 'mongoose';

const periodSchema = new mongoose.Schema(
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

const timetableDetailsSchema = new mongoose.Schema({
    subjectName: { type: String },
});

const timeTableSchema = new mongoose.Schema({
    year: { type: Number, enum: { values: [1, 2, 3, 4] } },
    Semester: { type: Number, enum: { values: [1, 2, 3, 4, 5, 6, 7, 8] } },
    timeTable: {
        monday: periodSchema,
        tuesday: periodSchema,
        wednesday: periodSchema,
        thursday: periodSchema,
        friday: periodSchema,
    },
});
