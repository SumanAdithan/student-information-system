import { GetObjectCommand, DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { config } from '@config';
import { Response } from 'express';
import mime from 'mime-types';
import { PassThrough } from 'stream';

type Folder = 'students' | 'faculties' | 'note';

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

    getFileName(folder: Folder, id: string, fileName: string) {
        const ext = fileName.split('.').pop();
        return `${folder}/${folder}-${id}-${Date.now()}.met.${ext}`;
    }

    async uploadFile(folder: Folder, fileName: string, id: string, file: Buffer) {
        const fileKey = this.getFileName(folder, id, fileName);

        try {
            const uploadParams = {
                Bucket: this.bucketName,
                Key: fileKey,
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
            return { success: false };
        }
    }

    async streamFile(folder: string, fileName: string, response: Response) {
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
            response.setHeader('Content-Disposition', `inline; filename="${fileName}"`);

            const stream = new PassThrough();
            stream.end(await Body.transformToByteArray());
            stream.pipe(response);

            return { success: true };
        } catch (err) {
            console.log(err);
            return { success: false };
        }
    }
}
