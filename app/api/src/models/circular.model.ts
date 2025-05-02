import { Circular, Notes } from '@sis/types';
import { Schema, model } from 'mongoose';

const CircularSchema = new Schema({
    file: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: () => () => {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy = today.getFullYear();
            return `${dd}-${mm}-${yyyy}`;
        },
    },
});

const CircularModel = model('circular', CircularSchema);

export const addCircularData = (notesData: Circular) => CircularModel.create(notesData);
export const getCircularById = (notesId: string) => CircularModel.findById(notesId);
export const getAllCircular = () => CircularModel.find();
export const deleteCircularById = (notesId: string) => CircularModel.findByIdAndDelete(notesId);
