import { z } from 'zod';

export const DuesSchema = z.object({
    registerNo: z.number(),
    name: z.string(),
    year: z.number(),
    amounts: z.object({
        tuition_fee: z.number().optional(),
        bus_fee: z.number().optional(),
        stationary_fee: z.number().optional(),
        sports_placement_fee: z.number().optional(),
        apparel_fee: z.number().optional(),
        examination_fee: z.number().optional(),
        fine: z.number().optional(),
    }),
});

export type UpdateDues = z.infer<typeof DuesSchema>;
export type DuesDto = z.infer<typeof DuesSchema>;
