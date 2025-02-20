import { Assignment } from '@sis/types';
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
    {
        code: { type: String, required: [true, 'please enter subject code'] },
        name: { type: String, required: [true, 'please enter subject code'] },
        status: { type: Boolean, default: false },
        mark: { type: Number, default: 0 },
    },
    { _id: false }
);

const assignmentSchema = new mongoose.Schema({
    registerNo: { type: Number, required: [true, 'please enter register no'] },
    name: { type: String, required: [true, 'please enter name'] },
    results: {
        one: [resultSchema],
        two: [resultSchema],
        three: [resultSchema],
    },
});

const AssignmentModel = mongoose.model('Assignment', assignmentSchema);
export const addAssignmentData = (data: Assignment[]) => AssignmentModel.insertMany(data);
export const deleteAssignmentData = () => AssignmentModel.deleteMany();