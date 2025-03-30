import { DefaultValues, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema, TypeOf } from 'zod';

export const useZodForm = <T extends ZodSchema>(
    schema: T,
    defaultValues?: Partial<TypeOf<T>>
): UseFormReturn<TypeOf<T>> => {
    return useForm<TypeOf<T>>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<TypeOf<T>>,
    });
};
