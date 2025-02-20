import { RegulationInfo, Semesters } from '@sis/types';
import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
    {
        code: { type: String, required: true },
        name: { type: String, required: true },
    },
    { _id: false }
);

const semesterSchema = new mongoose.Schema(
    {
        subjects: [subjectSchema],
        laboratory: [subjectSchema],
    },
    { _id: false }
);

const regulationInfoSchema = new mongoose.Schema({
    regulation: { type: String, required: true, unique: true },
    semesters: {
        one: semesterSchema,
        two: semesterSchema,
        three: semesterSchema,
        four: semesterSchema,
        five: semesterSchema,
        six: semesterSchema,
        seven: semesterSchema,
        eight: semesterSchema,
    },
});

export const RegulationInfoModel = mongoose.model('RegulationInfo', regulationInfoSchema);
export const getAllRegulationInfo = () => RegulationInfoModel.find();
export const findRegulationInfo = (regulation: string) => RegulationInfoModel.findOne({ regulation });
export const addRegulationInfoData = (data: RegulationInfo) => RegulationInfoModel.insertMany(data);
export const deleteRegulationInfoData = () => RegulationInfoModel.deleteMany();