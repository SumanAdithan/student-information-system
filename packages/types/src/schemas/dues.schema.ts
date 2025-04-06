import { z } from 'zod';

export const DuesSchema = z.object({
    registerNo: z.number(),
    name: z.string(),
    year: z.number(),
    tuition_fee: z.number(),
    bus_fee: z.number(),
    stationary_fee: z.number(),
    sports_placement_fee: z.number(),
    apparel_fee: z.number(),
    examination_fee: z.number(),
    fine: z.number(),
});

export type UpdateDues = z.infer<typeof DuesSchema>;
export type DuesDto = z.infer<typeof DuesSchema>;
