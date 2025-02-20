import { AssignmentResult } from '@sis/types';
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
    results: {
        one: [AssignmentEntry],
        two: [AssignmentEntry],
        three: [AssignmentEntry],
    },
});

const AssignmentResultModel = model('Assignment', AssignmentResultSchema);
export const createAssignmentResult = (assignmentResult: AssignmentResult) =>
    AssignmentResultModel.create(assignmentResult);

// seeder
export const addAssignmentResultData = (data: AssignmentResult[]) => AssignmentResultModel.insertMany(data);
export const deleteAssignmentResultData = () => AssignmentResultModel.deleteMany();
