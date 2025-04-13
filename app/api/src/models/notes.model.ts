import { Notes } from '@sis/types';
import { Schema, model } from 'mongoose';

const NotesSchema = new Schema({
    fileName: {
        type: String,
        required: true,
    },
    subjectName: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    regulation: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
});

const NotesModel = model('notes', NotesSchema);

export const addNotes = (notesData: Notes) => NotesModel.create(notesData);
