import { ErrorHandler } from '@utils';
import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
    <T>(schema: ZodSchema<T>) =>
    (request: Request, response: Response, next: NextFunction) => {
        console.log(request.body);
        const result = schema.safeParse(request.body);
        if (!result.success) {
            const formattedError = result.error.format();
            const zodError = Object.entries(formattedError).reduce<Record<string, string>>((acc, [key, value]) => {
                if (key === '_errors') return acc;
                acc[key] = (value as any)._errors[0];
                return acc;
            }, {});
            return next(new ErrorHandler(400, 'validation failed', 'ZodError', zodError));
        }
        next();
    };
