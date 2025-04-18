import { z } from 'zod';
import { PdfFileSchema } from './file.schema';

export const NotesSchemaClient = z.object({
    file: PdfFileSchema,
    subjectName: z.string().min(1, { message: 'Subject name is required' }),
    code: z.string().min(1, { message: 'Code name is required' }),
    regulation: z.string(),
    semester: z.number(),
});

export const NotesSchemaServer = z.object({
    subjectName: z.string().min(1, { message: 'Subject name is required' }),
    code: z.string().min(1, { message: 'Code name is required' }),
    regulation: z.string(),
    semester: z.number(),
});

export type NotesDto = z.infer<typeof NotesSchemaServer>;
