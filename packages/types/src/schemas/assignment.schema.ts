import { z } from 'zod';

export const AssignmentResultSchema = z.object({
    registerNo: z.number(),
    name: z.string(),
    year: z.number(),
    subject: z.string(),
    status: z.coerce.boolean(),
    code: z.string(),
    result: z.enum(['one', 'two', 'three']),
    mark: z.number().min(0).max(10),
});

export type UpdateAssignmentResult = z.infer<typeof AssignmentResultSchema>;
export type AssignmentResultDto = z.infer<typeof AssignmentResultSchema>;
