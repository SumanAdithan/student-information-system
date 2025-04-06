import { AssignmentResult, QueryParams } from '@sis/types';
import { Schema, model } from 'mongoose';

const AssignmentEntry = new Schema(
    {
        code: { type: String, required: [true, 'please enter subject code'] },
        name: { type: String, required: [true, 'please enter subject code'] },
        status: { type: Boolean, default: false },
        mark: { type: Number, default: 0 },
    },
    { _id: false }
);

const AssignmentResultSchema = new Schema({
    registerNo: { type: Number, required: [true, 'please enter register no'] },
    name: { type: String, required: [true, 'please enter name'] },
    year: { type: Number, required: [true, 'please enter a year'] },
    results: {
        one: [AssignmentEntry],
        two: [AssignmentEntry],
        three: [AssignmentEntry],
    },
});

const AssignmentResultModel = model('Assignment', AssignmentResultSchema);

export const createAssignmentData = (assignmentResult: AssignmentResult) =>
    AssignmentResultModel.create(assignmentResult);
export const getAssignmentDataByRegisterNo = (registerNo: number) => AssignmentResultModel.findOne({ registerNo });
export const getAllAssignmentData = () => AssignmentResultModel.find();

export const updateAssignmentDataMark = (registerNo: number, result: string, code: string, mark: number) =>
    AssignmentResultModel.updateOne(
        { [`results.${result}.code`]: code, registerNo },
        { $set: { [`results.${result}.$.mark`]: mark, [`results.${result}.$.status`]: mark > 0 } }
    );

export const getFilteredAssignments = async (queryStr: QueryParams) => {
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
                mark: '$filteredResults.mark',
            },
        });
    }

    return AssignmentResultModel.aggregate(pipeline);
};

export const deleteAssignmentByRegisterNo = (registerNo: number) => AssignmentResultModel.deleteOne({ registerNo });
