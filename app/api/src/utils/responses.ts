import { Response } from 'express';

// success response
export const successResponse = (
    response: Response,
    statusCode: number,
    data?: any,
    message: string = 'Success',
    redirectUrl?: string
) => {
    return response.status(statusCode).json({
        success: true,
        message,
        data,
        redirectUrl,
    });
};

// token response:cookie
export const tokenResponse = (response: Response, token: string, statusCode: number, redirectUrl: string) => {
    const options = {
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRES_TIME) * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    return response.cookie('token', token, options).status(statusCode).json({
        success: true,
        redirectUrl,
    });
};

export const sendPdf = (response: Response, fileName: string, pdfBuffer: Buffer) => {
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    response.end(pdfBuffer);
};
