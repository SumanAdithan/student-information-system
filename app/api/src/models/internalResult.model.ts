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
