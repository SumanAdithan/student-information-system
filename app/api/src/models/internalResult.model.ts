import { InternalResult, QueryParams } from '@sis/types';
import { Schema, model } from 'mongoose';

const InternalEntry = new Schema(
    {
        code: { type: String, required: [true, 'please enter subject code'] },
        name: { type: String, required: [true, 'please enter subject code'] },
        status: { type: Boolean, default: false },
        mark: { type: Number, default: 0 },
    },
    { _id: false }
);

const InternalResultSchema = new Schema({
    registerNo: { type: Number, required: [true, 'please enter register no'] },
    name: { type: String, required: true },
    year: { type: Number, required: [true, 'please enter a year'] },
    results: {
        one: [InternalEntry],
        two: [InternalEntry],
        three: [InternalEntry],
        four: [InternalEntry],
    },
});

const InternalResultModel = model('InternalMark', InternalResultSchema);

export const createInternalResultData = (internalResult: InternalResult) => InternalResultModel.create(internalResult);
export const getInternalResultDataByRegisterNo = (registerNo: number) => InternalResultModel.findOne({ registerNo });

export const updateInternalResultMark = (registerNo: number, result: string, code: string, mark: number) =>
    InternalResultModel.updateOne(
        { [`results.${result}.code`]: code, registerNo },
        { $set: { [`results.${result}.$.mark`]: mark, [`results.${result}.$.status`]: mark >= 50 } }
    );

export const getFilteredInternalResult = async (queryStr: QueryParams) => {
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

    return InternalResultModel.aggregate(pipeline);
};

export const deleteInternalResultByRegisterNo = (registerNo: number) => InternalResultModel.deleteOne({ registerNo });

export const getInternalResultStatistics = async () => {
    const result = await InternalResultModel.aggregate([
        {
            $project: {
                year: 1,
                one_pass: {
                    $size: {
                        $filter: {
                            input: '$results.one',
                            as: 'sub',
                            cond: { $eq: ['$$sub.status', true] },
                        },
                    },
                },
                two_pass: {
                    $size: {
                        $filter: {
                            input: '$results.two',
                            as: 'sub',
                            cond: { $eq: ['$$sub.status', true] },
                        },
                    },
                },
                three_pass: {
                    $size: {
                        $filter: {
                            input: '$results.three',
                            as: 'sub',
                            cond: { $eq: ['$$sub.status', true] },
                        },
                    },
                },
            },
        },
        {
            $group: {
                _id: '$year',
                internal_1_pass: { $sum: '$one_pass' },
                internal_2_pass: { $sum: '$two_pass' },
                internal_3_pass: { $sum: '$three_pass' },
            },
        },
        {
            $project: {
                _id: 0,
                year: '$_id',
                internal_1_pass: 1,
                internal_2_pass: 1,
                internal_3_pass: 1,
            },
        },
        {
            $sort: { year: 1 },
        },
    ]);

    return result;
};
