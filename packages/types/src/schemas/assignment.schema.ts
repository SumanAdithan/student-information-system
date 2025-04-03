import { z } from 'zod';

const SubjectSchema = z
    .object({
        code: z.string().min(1, 'Subject code is required'),
        name: z.string().min(1, 'Subject name is required'),
        status: z.boolean(),
        mark: z.number().min(0, 'Mark cannot be negative'),
    })
    .partial();

const ResultsSchema = z
    .object({
        one: SubjectSchema,
        two: SubjectSchema,
        three: SubjectSchema,
    })
    .partial();

export const AssignmentResultsSchema = z
    .object({
        results: ResultsSchema,
    })
    .partial();

export const UpdateAssignmentResultSchema = AssignmentResultsSchema.partial();
