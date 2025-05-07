import { Student, UpdateStudent } from '@sis/types';
import { hashPassword } from '@utils';
import { Schema, model } from 'mongoose';

const StudentSchema = new Schema(
    {
        profileImage: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        registerNo: {
            type: Number,
            required: true,
            unique: true,
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
            required: true,
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
            required: true,
        },
        regulation: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        accommodation: {
            type: String,
            required: true,
            enum: ['Day Scholar', 'Hosteler'],
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
        qrCode: {
            type: String,
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

StudentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hashPassword(this.password);
    next();
});

const StudentModel = model('Student', StudentSchema);

export const getStudentById = (studentId: string) => StudentModel.findById(studentId);
export const getStudentByRegisterNo = (registerNo: number) => StudentModel.findOne({ registerNo });
export const getStudentByEmail = (studentEmail: string) => StudentModel.findOne({ email: studentEmail });
export const createStudent = (student: Student) => StudentModel.create(student);
export const getAllStudentData = () => StudentModel.find();
export const updateStudentById = (studentId: string, updatedItems: UpdateStudent) =>
    StudentModel.findByIdAndUpdate(studentId, updatedItems, { new: true, runValidators: true });
export const deleteStudentById = (studentId: string) => StudentModel.findByIdAndDelete(studentId);

export const updateStudentDues = (registerNo: number, updatedItems: { dues: number }) =>
    StudentModel.findOneAndUpdate({ registerNo }, updatedItems, {
        new: true,
        runValidators: true,
    });
