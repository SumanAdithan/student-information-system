import { ZodError } from 'zod';
import ErrorHandler from './ErrorHandler';

export const sendZodError = (error: ZodError) => {
    const formattedError = error.format();
    const zodError = Object.entries(formattedError).reduce<Record<string, string>>((acc, [key, value]) => {
        if (key === '_errors') return acc;
        acc[key] = (value as any)._errors[0];
        return acc;
    }, {});
    return new ErrorHandler('validation failed', 400, 'ZodError', zodError);
};
