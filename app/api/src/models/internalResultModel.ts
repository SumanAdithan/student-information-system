import { InternalResult } from '@sis/types';
import { Schema, model } from 'mongoose';

const InternalEntry = new Schema(
    {
        code: { type: String, required: [true, 'please enter subject code'] },
        name: { type: String, required: [true, 'please enter subject code'] },
        mark: { type: Number, default: 0 },
    },
    { _id: false }
);

const InternalResultSchema = new Schema({
    registerNo: { type: Number, required: [true, 'please enter register no'] },
    name: { type: String, required: true },
    results: {
        one: [InternalEntry],
        two: [InternalEntry],
        three: [InternalEntry],
        semester: [InternalEntry],
    },
});

const InternalResultModel = model('InternalMark', InternalResultSchema);
export const createInternalResult = (internalResult: InternalResult) => InternalResultModel.create(internalResult);

// seeder
export const addInternalResultData = (data: InternalResult[]) => InternalResultModel.insertMany(data);
export const deleteInternalResultData = () => InternalResultModel.deleteMany();
