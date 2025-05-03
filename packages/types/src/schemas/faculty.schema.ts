import { z } from 'zod';

export const FacultySchema = z.object({
    name: z.string(),
    email: z.string(),
    position: z.enum([
        'Principal',
        'Head of Department',
        'Assistant Professor',
        'Associate Professor',
        'Professor',
        'Lecturer',
        'Guest Lecturer',
        'Lab Assistant',
        'Dean',
        'Vice Principal',
    ]),
    subjects: z
        .array(
            z.object({
                subjectName: z.string(),
                code: z.string(),
                year: z.string(),
            })
        )
        .optional(),
    total_subjects: z.number(),
    total_classes: z.string(),
    password: z.string().optional(),
});

export const FacultyUpdateSchema = FacultySchema.partial();

export type FacultyDto = z.infer<typeof FacultySchema>;
export type UpdateFacultyDto = z.infer<typeof FacultyUpdateSchema>;
