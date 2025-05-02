import { z } from 'zod';

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const IMAGE_MIME_TYPES = ['image/png', 'image/jpeg'];
const PDF_MIME_TYPES = ['application/pdf'];

// export const ImageSchema = z.union([
//     z.string(),
//     z.custom<File>((file) => {
//         const image = file[0];
//         if (!(image instanceof File)) return false;
//         if (!IMAGE_MIME_TYPES.includes(image.type)) return false;
//         if (image.size > MAX_FILE_SIZE) return false;
//         return true;
//     }, 'Invalid image. Must be a PNG/JPG under 50MB'),
// ]);

export const ImageSchema = z
    .union([z.instanceof(File, { message: 'Image is required' }).optional(), z.string()])
    .refine(
        (value) => {
            if (typeof value === 'string') return true;
            if (!(value instanceof File)) return false;
            return IMAGE_MIME_TYPES.includes(value.type) && value.size <= MAX_FILE_SIZE;
        },
        { message: 'Invalid image. Must be a png/jpeg under 50MB' }
    );

export const PdfFileSchema = z
    .union([z.instanceof(File, { message: 'Notes pdf is required' }), z.string().optional()])
    .refine(
        (value) => {
            if (typeof value === 'string') return true;
            if (!(value instanceof File)) return false;
            return PDF_MIME_TYPES.includes(value.type) && value.size <= MAX_FILE_SIZE;
        },
        { message: 'Invalid file. Must be a PDF under 50MB' }
    );

// .instanceof(FileList)
//     .refine((files) => files.length === 1, { message: 'Please upload exactly one PDF file' })
//     .refine((files) => files[0].type === 'application/pdf', { message: 'Only PDF files are allowed' })
//     .refine((files) => files[0].size <= 50 * 1024 * 1024, { message: 'File must be under 50MB' })
//     .transform(() => '');
