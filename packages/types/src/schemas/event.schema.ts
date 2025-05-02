import { z } from 'zod';
import { ImageSchema } from './file.schema';

export const EventSchemaClient = z.object({
    file: ImageSchema,
    name: z.string().min(1, { message: 'Subject name is required' }),
    registerLink: z.string().min(1, { message: 'Code name is required' }),
});

export const EventSchemaServer = z.object({
    name: z.string().min(1, { message: 'Subject name is required' }),
    registerLink: z.string().min(1, { message: 'Code name is required' }),
});

export type EventDto = z.infer<typeof EventSchemaServer>;
