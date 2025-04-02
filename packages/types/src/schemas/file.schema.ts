import { z } from 'zod';

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const IMAGE_MIME_TYPES = ['image/png', 'image/jpeg'];

export const profileImageSchema = z.union([
    z.string(),
    z.custom<File>((file) => {
        const image = file[0];
        if (!(image instanceof File)) return false;
        if (!IMAGE_MIME_TYPES.includes(image.type)) return false;
        if (image.size > MAX_FILE_SIZE) return false;
        return true;
    }, 'Invalid image. Must be a PNG/JPG under 50MB'),
]);
