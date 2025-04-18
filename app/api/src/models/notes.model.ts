import { Notes } from '@sis/types';
import { Schema, model } from 'mongoose';

const NotesSchema = new Schema({
    file: {
        type: String,
        default: '',
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

export const addNotesData = (notesData: Notes) => NotesModel.create(notesData);
export const getNotesById = (notesId: string) => NotesModel.findById(notesId);
export const getAllNotes = () => NotesModel.find();
export const deleteNotesById = (notesId: string) => NotesModel.findByIdAndDelete(notesId);
