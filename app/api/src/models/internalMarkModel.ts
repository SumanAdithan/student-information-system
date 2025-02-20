import { InternalMark } from '@sis/types';
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
    {
        code: { type: String, required: [true, 'please enter subject code']},
        name: { type: String, required: [true, 'please enter subject code'] },
        mark: { type: Number, default: 0 },
    },
    { _id: false }
);

const internalMarkSchema = new mongoose.Schema({
    registerNo: { type: Number, required: [true, 'please enter register no'] },
    name:{type:String,required:true},
    results: {
        one: [resultSchema],
        two: [resultSchema],
        three: [resultSchema],
        semester: [resultSchema],
        
    },
});

const internalMarkModel = mongoose.model('InternalMark', internalMarkSchema);
export const addInternalMarkData = (data: InternalMark[]) => internalMarkModel.insertMany(data);