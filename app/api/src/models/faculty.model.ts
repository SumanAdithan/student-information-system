import { Faculty, UpdateFacultyDto } from '@sis/types';
import { Schema, model } from 'mongoose';

const FacultySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    total_subjects: {
        type: Number,
        required: true,
    },
    total_classes: {
        type: String,
        required: true,
    },
    subjects: [
        {
            subjectName: {
                type: String,
                required: true,
            },
            code: {
                type: String,
                required: true,
            },
            year: {
                type: String,
                required: true,
            },
        },
    ],
    role: {
        type: String,
        default: 'faculty',
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
});

const FacultyModel = model('Faculty', FacultySchema);

export const getFacultyById = (facultyId: string) => FacultyModel.findById(facultyId);

export const getFacultyByEmail = (facultyEmail: string) => FacultyModel.findOne({ email: facultyEmail });

export const getAllFacultiesData = () => FacultyModel.find();

export const createNewFacultyData = (facultyData: Faculty) => FacultyModel.create(facultyData);

export const updateFaculyData = (facultyId: string, updatedFacultyData: UpdateFacultyDto) =>
    FacultyModel.findByIdAndUpdate(facultyId, updatedFacultyData, { new: true, runValidators: true });

export const deleteFacultyData = (facultyId: string) => FacultyModel.findByIdAndDelete(facultyId);
