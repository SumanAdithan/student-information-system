import { z } from 'zod';
import { PdfFileSchema } from './file.schema';

export const CircularSchemaClient = z.object({
    file: PdfFileSchema,
    name: z.string().min(1, { message: 'Subject name is required' }),
    year: z.string().min(1, { message: 'Code name is required' }),
});

export const CircularSchemaServer = z.object({
    name: z.string().min(1, { message: 'Subject name is required' }),
    year: z.string().min(1, { message: 'Code name is required' }),
});

export type CircularDto = z.infer<typeof CircularSchemaServer>;
