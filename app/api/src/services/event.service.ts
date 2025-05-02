import { addEventData, deleteEventById, getAllEvent, getEventById } from '@models';
import { Event } from '@sis/types';
import { AwsService } from './aws.service';

const awsService = new AwsService();

export class EventService {
    static async createEvent(event: Event, file: Express.Multer.File) {
        if (!file) return { success: false };
        const newEvent = await addEventData(event);

        const eventFile = await awsService.uploadFile('event', file.originalname, `${newEvent.name}`, file.buffer);
        if (!eventFile.success) return { success: false };

        newEvent.file = eventFile.fileName;
        await newEvent.save();

        return { success: true };
    }

    static async getAllEvent() {
        return await getAllEvent();
    }

    static async deleteEvent(eventId: string) {
        const event = await getEventById(eventId);
        if (!event) return { success: false, error: 'Event not found' };

        if (event.file) {
            const deleteEvent = await awsService.deleteFile(`event/${event.file}`);
            if (!deleteEvent.success) return { success: false, error: `Can't delete Event` };
        }

        await deleteEventById(eventId);
        return { success: true };
    }
}
