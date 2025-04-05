import { z } from 'zod';

export const AssignmentResultsSchema = z.object({
    registerNo: z.number(),
    name: z.string(),
    year: z.number(),
    subject: z.string(),
    status: z.coerce.boolean(),
    code: z.string(),
    result: z.string(),
    mark: z.number().min(0).max(10),
});

export type UpdateAssignmentResult = z.infer<typeof AssignmentResultsSchema>;
export type AssignmentResultDto = z.infer<typeof AssignmentResultsSchema>;
