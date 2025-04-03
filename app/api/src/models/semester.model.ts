import { SemesterResult } from '@sis/types';
import { Schema, model } from 'mongoose';

const SemesterEntry = new Schema({
    code: { type: String, required: [true, 'please enter subject code'] },
    name: { type: String, required: [true, 'please enter subject code'] },
    grade: { type: String, default: '-' },
});

const SemesterResultSchema = new Schema({
    registerNo: { type: Number, required: [true, 'please enter register no'] },
    name: { type: String, required: true },
    results: {
        one: [SemesterEntry],
        two: [SemesterEntry],
        three: [SemesterEntry],
        four: [SemesterEntry],
        five: [SemesterEntry],
        six: [SemesterEntry],
        seven: [SemesterEntry],
        eight: [SemesterEntry],
    },
});

export const SemesterResultModel = model('SemesterResult', SemesterResultSchema);
export const createSemesterResult = (semesterResult: SemesterResult) => SemesterResultModel.create(semesterResult);
