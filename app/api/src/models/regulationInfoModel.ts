import { RegulationInfo, Semesters } from '@sis/types';
import { Schema, model } from 'mongoose';

const SubjectSchema = new Schema(
    {
        code: { type: String, required: true },
        name: { type: String, required: true },
    },
    { _id: false }
);

const SemesterSchema = new Schema(
    {
        subjects: [SubjectSchema],
        laboratory: [SubjectSchema],
    },
    { _id: false }
);

const RegulationInfoSchema = new Schema({
    regulation: { type: String, required: true, unique: true },
    semesters: {
        one: SemesterSchema,
        two: SemesterSchema,
        three: SemesterSchema,
        four: SemesterSchema,
        five: SemesterSchema,
        six: SemesterSchema,
        seven: SemesterSchema,
        eight: SemesterSchema,
    },
});

export const RegulationInfoModel = model('RegulationInfo', RegulationInfoSchema);
export const getAllRegulationInfo = () => RegulationInfoModel.find();
export const findRegulationInfo = (regulation: string) => RegulationInfoModel.findOne({ regulation });

// seeder
export const addRegulationInfoData = (data: RegulationInfo) => RegulationInfoModel.insertMany(data);
export const deleteRegulationInfoData = () => RegulationInfoModel.deleteMany();
