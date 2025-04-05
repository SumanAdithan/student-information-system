import { z } from 'zod';

export const InternalResultSchema = z.object({
    registerNo: z.number(),
    name: z.string(),
    year: z.number(),
    subject: z.string(),
    status: z.coerce.boolean(),
    code: z.string(),
    result: z.enum(['one', 'two', 'three', 'four']),
    mark: z.number().min(0).max(10),
});

export type UpdateInternalResult = z.infer<typeof InternalResultSchema>;
export type InternalResultDto = z.infer<typeof InternalResultSchema>;
