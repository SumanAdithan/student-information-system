import { string, z } from 'zod';

export const NotesSchema = z.object({
    fineName: z.string().optional(),
    subjectName: z.string(),
    code: z.string(),
    regulation: z.string(),
    semester: z.number(),
});

export type NotesDto = z.infer<typeof NotesSchema>;
