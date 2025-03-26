import { Schema, model } from 'mongoose';

const StudentSchema = new Schema(
    {
        profileImage: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        registerNo: {
            type: Number,
            required: true,
        },
        cgpa: {
            type: Number,
            default: 0,
        },
        attendance: {
            type: Number,
            default: 0,
        },
        dues: {
            type: Number,
            default: 0,
        },
        dob: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female'],
        },
        department: {
            type: String,
            default: 'CSE',
        },
        year: {
            type: Number,
            required: true,
        },
        semester: {
            type: Number,
            required: true,
        },
        batch: {
            type: String,
            required: true,
        },
        arrears: {
            type: Number,
            default: 0,
        },
        degree: {
            type: String,
            default: 'B.E',
        },
        email: {
            type: String,
            required: true,
        },
        accomodation: {
            type: String,
            required: true,
            enum: ['Day Scholar', 'Hosteller'],
        },
        mobile: {
            type: Number,
            required: true,
        },
        role: {
            type: String,
            default: 'student',
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

StudentSchema.virtual('semesterWord').get(function () {
    const numberToWord: Record<number, string> = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
    };
    return numberToWord[this.semester];
});

const StudentModel = model('Student', StudentSchema);

export const getStudentById = (studentId: string) => StudentModel.findById(studentId);
export const getStudentByEmail = (studentEmail: string) => StudentModel.findOne({ email: studentEmail });
