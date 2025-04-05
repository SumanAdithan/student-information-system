import { QueryParams, SemesterResult } from '@sis/types';
import { Schema, model } from 'mongoose';

const SemesterEntry = new Schema({
    code: { type: String, required: [true, 'please enter subject code'] },
    name: { type: String, required: [true, 'please enter subject code'] },
    status: { type: Boolean, default: false },
    grade: { type: String, default: '-', enum: ['-', 'UA', 'U', 'C', 'B', 'B+', 'A', 'A+'] },
});

const SemesterResultSchema = new Schema({
    registerNo: { type: Number, required: [true, 'please enter register no'] },
    name: { type: String, required: true },
    year: { type: Number, required: [true, 'please enter a year'] },
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

const SemesterResultModel = model('SemesterResult', SemesterResultSchema);

export const createSemesterResultData = (semesterResult: SemesterResult) => SemesterResultModel.create(semesterResult);
export const getSemesterResultDataByRegisterNo = (registerNo: number) => SemesterResultModel.findOne({ registerNo });
export const getSemesterResultAssignmentData = () => SemesterResultModel.find();

export const updateSemesterResultGrade = (registerNo: number, result: string, code: string, grade: string) =>
    SemesterResultModel.updateOne(
        { [`results.${result}.code`]: code, registerNo },
        { $set: { [`results.${result}.$.grade`]: grade, [`results.${result}.$.status`]: grade } }
    );

export const getFilteredSemesterResult = async (queryStr: QueryParams) => {
    const year = parseInt(queryStr.year);
    const result = queryStr.result;
    const status = queryStr.status === 'true';

    const pipeline: any[] = [];

    if (year) {
        pipeline.push({ $match: { year } });
    }

    if (result && typeof status !== 'undefined') {
        pipeline.push({
            $project: {
                registerNo: 1,
                name: 1,
                year: 1,
                semester: result,
                filteredResults: {
                    $filter: {
                        input: `$results.${result}`,
                        as: 'entry',
                        cond: { $eq: ['$$entry.status', status] },
                    },
                },
            },
        });

        pipeline.push({ $unwind: '$filteredResults' });

        pipeline.push({
            $project: {
                registerNo: 1,
                year: 1,
                name: 1,
                result: '$semester',
                subject: '$filteredResults.name',
                code: '$filteredResults.code',
                status: '$filteredResults.status',
                grade: '$filteredResults.grade',
            },
        });
    }

    return SemesterResultModel.aggregate(pipeline);
};
