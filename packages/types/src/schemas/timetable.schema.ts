import { z } from 'zod';

const PeriodSchema = z.object({
    one: z.string().optional(),
    two: z.string().optional(),
    three: z.string().optional(),
    four: z.string().optional(),
    five: z.string().optional(),
    six: z.string().optional(),
});

export const TimetablePeriodSchema = z.object({
    monday: PeriodSchema.optional(),
    tuesday: PeriodSchema.optional(),
    wednesday: PeriodSchema.optional(),
    thursday: PeriodSchema.optional(),
    friday: PeriodSchema.optional(),
});

export const TimetableDetailsSchema = z.array(
    z.object({
        subjectName: z.string().optional(),
        code: z.string().optional(),
        staff: z.string().optional(),
        class: z.string().optional(),
    })
);

export const TimetableSchema = z.object({
    timetable: TimetablePeriodSchema.optional(),
    timetableDetails: TimetableDetailsSchema.optional(),
});

export type UpdateTimetableDto = z.infer<typeof TimetableSchema>;
export type UpdateTimetableType = z.infer<typeof TimetableSchema>;
