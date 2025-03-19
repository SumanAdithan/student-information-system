import { Student, UpdateStudent } from '@sis/types';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const StudentSchema = new Schema(
    {
        profileImage: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Please enter product name'],
            trim: true,
        },
        registerNo: {
            type: Number,
            required: [true, 'Please enter register no'],
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
            required: [true, 'Please enter Date of Birth'],
        },
        gender: {
            type: String,
            required: [true, 'please select gender'],
            enum: {
                values: ['Male', 'Female'],
                message: 'Please select correct gender',
            },
        },
        department: {
            type: String,
            default: 'CSE',
        },
        year: {
            type: Number,
            required: [true, 'please enter year'],
        },
        regulation: {
            type: String,
            required: [true, 'please enter regulation'],
        },
        semester: {
            type: Number,
            required: [true, 'please enter semester'],
            enum: {
                values: [1, 2, 3, 4, 5, 6, 7, 8],
                message: 'Please enter correct semester',
            },
        },
        batch: {
            type: String,
            required: [true, 'please enter batch'],
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
            required: [true, 'please enter email'],
        },
        mobile: {
            type: Number,
            required: [true, 'please enter mobile no'],
        },
        accomodation: {
            type: String,
            required: [true, 'please select accomodation'],
            enum: {
                values: ['Day Scholar', 'Hosteller'],
                message: 'Please select correct accomodation',
            },
        },
        password: {
            type: String,
            required: [true, 'Please enter password'],
            maxlength: [20, 'Password cannot exceed 6 characters'],
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
    this.password = await bcrypt.hash(this.password, 10);
    next();
});



export const StudentModel = model('Student', StudentSchema);
export const getAllStudents = () => StudentModel.find();
export const createStudent = (student: Student) => StudentModel.create(student);
export const getStudentByEmail = (email: string) => StudentModel.find({ email });
export const getStudentByID = (id: string) => StudentModel.findById(id);
export const updateStudentByID = (id: string, updatedItems: UpdateStudent) =>
    StudentModel.findByIdAndUpdate(id, updatedItems, { new: true, runValidators: true });
export const deleteStudentByID = (id: string) => StudentModel.findByIdAndDelete(id);
// export const isValidPassword = (password:string) => StudentModel.

// seeder
export const addStudentsData = (students: Student[]) => StudentModel.insertMany(students);
export const deleteStudentsData = () => StudentModel.deleteMany();
