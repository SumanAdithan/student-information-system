import { z } from 'zod';

const SubjectSchema = z
    .object({
        code: z.string().min(1, 'Subject code is required'),
        name: z.string().min(1, 'Subject name is required'),
        grade: z.string().min(0, 'Grade is required'),
    })
    .partial();

const ResultsSchema = z
    .object({
        one: SubjectSchema,
        two: SubjectSchema,
        three: SubjectSchema,
        four: SubjectSchema,
        five: SubjectSchema,
        six: SubjectSchema,
        seven: SubjectSchema,
        eight: SubjectSchema,
    })
    .partial();

export const SemesterResultSchema = z
    .object({
        results: ResultsSchema,
    })
    .partial();

export const UpdateSemesterResultSchema = SubjectSchema.partial();
