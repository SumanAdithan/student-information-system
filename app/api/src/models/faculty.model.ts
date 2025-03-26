import { Schema, model } from 'mongoose';

const FacultySchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'faculty',
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

const FacultyModel = model('Faculty', FacultySchema);

export const getFacultyById = (facultyId: string) => FacultyModel.findById(facultyId);
export const getFacultyByEmail = (facultyEmail: string) => FacultyModel.findOne({ email: facultyEmail });
