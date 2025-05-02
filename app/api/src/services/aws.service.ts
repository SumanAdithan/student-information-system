import { GetObjectCommand, DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { config } from '@config';
import { Response } from 'express';
import mime from 'mime-types';
import { Readable } from 'stream';

type Folder = 'students' | 'faculties' | 'notes' | 'circular';

export class AwsService {
    private s3: S3Client;
    private bucketName: string;

    constructor() {
        this.bucketName = config.BUCKET_NAME;

        this.s3 = new S3Client({
            region: 'us-east-1',
            endpoint: config.AWS_S3_URI,
            credentials: {
                accessKeyId: config.AWS_ACCESS_KEY,
                secretAccessKey: config.AWS_SECRET_KEY,
            },
            forcePathStyle: config.AWS_FORCE_STYLE,
        });
    }

    getProfileImageName(folder: Folder, name: string, fileName: string) {
        const ext = fileName.split('.').pop();
        return `${folder}-${name}-${Date.now()}.met.${ext}`;
    }

    getPdfFileName(name: string, fileName: string) {
        const ext = fileName.split('.').pop();
        return `${name}.met.${ext}`;
    }

    async uploadFile(folder: Folder, fileName: string, name: string, file: Buffer) {
        const fileKey =
            folder === 'students'
                ? this.getProfileImageName(folder, name, fileName)
                : this.getPdfFileName(name, fileName);

        try {
            const uploadParams = {
                Bucket: this.bucketName,
                Key: `${folder}/${fileKey}`,
                Body: file,
            };
            await this.s3.send(new PutObjectCommand(uploadParams));

            return { success: true, fileName: fileKey };
        } catch (err) {
            return { success: false };
        }
    }

    async deleteFile(fileKey: string) {
        try {
            const deleteParams = {
                Bucket: this.bucketName,
                Key: fileKey,
            };

            await this.s3.send(new DeleteObjectCommand(deleteParams));
            return { success: true };
        } catch (err) {
            console.error('Delete failed:', err);
            return { success: false };
        }
    }

    async streamFile(folder: string, fileName: string, response: Response, dispositionType: 'inline' | 'attachment') {
        const fileKey = `${folder}/${fileName}`;
        try {
            const getParams = {
                Bucket: this.bucketName,
                Key: fileKey,
            };

            const fileExtension = fileName.split('.').pop();
            const mimeType = mime.lookup(fileExtension) || 'application/octet-stream';

            const { Body } = await this.s3.send(new GetObjectCommand(getParams));
            if (!Body) return { success: false };

            response.setHeader('Content-Type', mimeType);
            response.setHeader('Content-Disposition', `${dispositionType}; filename="${fileName}"`);

            const stream = Body as Readable;
            stream.pipe(response);

            return { success: true };
        } catch (err) {
            return { success: false };
        }
    }

    async getImages(icon: string) {
        const fileKey = `/assets/${icon}`;
        const getParams = {
            Bucket: this.bucketName,
            Key: fileKey,
        };

        const fileExtension = icon.split('.').pop();
        const mimeType = mime.lookup(fileExtension) || 'application/octet-stream';

        const { Body } = await this.s3.send(new GetObjectCommand(getParams));
        const buffer = Buffer.from(await Body.transformToByteArray());
        const image = buffer.toString('base64');

        return image;
    }
}
