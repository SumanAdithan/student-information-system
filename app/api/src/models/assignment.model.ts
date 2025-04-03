import { AssignmentResult } from '@sis/types';
import { Schema, model } from 'mongoose';

export interface AssignmentDocument extends AssignmentResult, Document {}

const AssignmentEntry = new Schema(
    {
        code: { type: String, required: [true, 'please enter subject code'] },
        name: { type: String, required: [true, 'please enter subject code'] },
        status: { type: Boolean, default: false },
        mark: { type: Number, default: 0 },
    },
    { _id: false }
);

const AssignmentResultSchema = new Schema<AssignmentDocument>({
    registerNo: { type: Number, required: [true, 'please enter register no'] },
    name: { type: String, required: [true, 'please enter name'] },
    results: {
        one: [AssignmentEntry],
        two: [AssignmentEntry],
        three: [AssignmentEntry],
    },
});

const AssignmentResultModel = model<AssignmentDocument>('Assignment', AssignmentResultSchema);

export const createAssignmentData = (assignmentResult: AssignmentResult) =>
    AssignmentResultModel.create(assignmentResult);
export const getAssignmentDataByRegisterNo = (registerNo: number) => AssignmentResultModel.findOne({ registerNo });
export const getAllAssignmentData = () => AssignmentResultModel.find();
