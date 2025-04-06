import { z } from 'zod';

export const SemesterResultSchema = z.object({
    registerNo: z.number(),
    name: z.string(),
    year: z.number(),
    subject: z.string(),
    status: z.coerce.boolean(),
    code: z.string(),
    result: z.enum(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']),
    grade: z.enum(['-', 'UA', 'U', 'C', 'B', 'B+', 'A', 'A+', 'O']),
});

export type UpdateSemesterResult = z.infer<typeof SemesterResultSchema>;
export type SemesterResultDto = z.infer<typeof SemesterResultSchema>;
