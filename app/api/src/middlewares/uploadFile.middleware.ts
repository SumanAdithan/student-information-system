import { ErrorHandler } from '@utils';
import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (request: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(null, false);
    }
    cb(null, true);
};

const limits = {
    fileSize: 50 * 1024 * 1024,
};

export const upload = multer({ storage, fileFilter, limits });

export const uploadSingleFile = (fieldName: string) => {
    return (request: Request, response: Response, next: NextFunction) => {
        upload.single(fieldName)(request, response, (err: any) => {
            if (err) {
                return next(new ErrorHandler(400, 'Error while upload file'));
            }

            if (!request.file && !request.body.data) {
                return next(new ErrorHandler(400, 'No file or JSON data provided.'));
            }

            if (request.body.data) {
                try {
                    request.body = JSON.parse(request.body.data);
                } catch (error) {
                    return next(new ErrorHandler(400, 'Invalid JSON format.'));
                }
            }

            next();
        });
    };
};
