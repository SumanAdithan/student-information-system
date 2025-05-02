import { Event } from '@sis/types';
import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
    file: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        required: true,
    },
    registerLink: {
        type: String,
        required: true,
    },
});

const EventModel = model('event', EventSchema);

export const addEventData = (eventData: Event) => {
    console.log(eventData);
    return EventModel.create(eventData);
};
export const getEventById = (eventId: string) => EventModel.findById(eventId);
export const getAllEvent = () => EventModel.find();
export const deleteEventById = (eventId: string) => EventModel.findByIdAndDelete(eventId);
