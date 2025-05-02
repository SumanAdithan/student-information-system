import { addCircularData, deleteCircularById, getAllCircular, getCircularById } from '@models';
import { Circular } from '@sis/types';
import { AwsService } from './aws.service';

const awsService = new AwsService();

export class CircularService {
    static async createCircular(circular: Circular, file: Express.Multer.File) {
        if (!file) return { success: false };
        const newCircular = await addCircularData(circular);

        const circularFile = await awsService.uploadFile(
            'circular',
            file.originalname,
            `${newCircular.name}(${newCircular.date})`,
            file.buffer
        );
        if (!circularFile.success) return { success: false };

        newCircular.file = circularFile.fileName;
        await newCircular.save();

        return { success: true };
    }

    static async getAllCircular() {
        return await getAllCircular();
    }

    static async deleteCircular(circularId: string) {
        const circular = await getCircularById(circularId);
        if (!circular) return { success: false, error: 'Circular not found' };

        if (circular.file) {
            const deleteCircular = await awsService.deleteFile(`circular/${circular.file}`);
            if (!deleteCircular.success) return { success: false, error: `Can't delete Circular` };
        }

        await deleteCircularById(circularId);
        return { success: true };
    }
}
