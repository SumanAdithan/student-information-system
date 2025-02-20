import { SemesterGrade } from '@sis/types';
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    code: { type: String, required: [true, 'please enter subject code']},
    name: { type: String, required: [true, 'please enter subject code'] },
    grade: { type: String, default: '-' },
});

const semesterGradeSchema = new mongoose.Schema({
    registerNo: { type: Number, required: [true, 'please enter register no'] },
    name:{type:String, required :true},
     results: {
        one: [resultSchema],
        two: [resultSchema],
        three:[resultSchema],
        four: [resultSchema],
        five: [resultSchema],
        six: [resultSchema],
        seven: [resultSchema],
        eight:[resultSchema],
        
    },
});

export const semesterGradeModel = mongoose.model('SemesterResult', semesterGradeSchema);
export const addSemesterResultData = (data: SemesterGrade[]) => semesterGradeModel.insertMany(data);