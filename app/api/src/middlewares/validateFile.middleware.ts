import { ErrorHandler } from '@utils';
import { NextFunction, Request, Response } from 'express';

export const validateFile = (expectedType: 'profileImage' | 'notes') => {
    return (request: Request, response: Response, next: NextFunction) => {
        const file = request.file;

        if (!file && expectedType === 'profileImage') {
            return next();
        }

        const mime = file.mimetype;
        const IMAGE_TYPES = ['image/jpeg', 'image/png'];
        const PDF_TYPE = 'application/pdf';

        if (expectedType === 'profileImage' && !IMAGE_TYPES.includes(mime)) {
            return next(new ErrorHandler(400, 'Only JPG/PNG images are allowed'));
        }

        if (expectedType === 'notes' && mime !== PDF_TYPE) {
            return next(new ErrorHandler(400, 'Only PDF files are allowed'));
        }

        next();
    };
};
