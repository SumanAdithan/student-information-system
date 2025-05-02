import { catchAsyncError } from '@middlewares';
import { EventService } from '@services';
import { Event, EventDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';

export const addEvent = catchAsyncError(async (request: Request<{}, {}, EventDto>, response, next) => {
    const event = request.body as Event;
    const createEvent = await EventService.createEvent(event, request.file);
    if (!createEvent.success) return next(new ErrorHandler(400, 'Unable to create a event'));
    successResponse(response, 201, null, 'Event Created');
});

export const getAllEvent = catchAsyncError(async (request, response, next) => {
    const event = await EventService.getAllEvent();
    successResponse(response, 200, event);
});

export const deleteEvent = catchAsyncError(async (request: Request<{ eventId: string }>, response, next) => {
    const { eventId } = request.params;
    const deleteEvent = await EventService.deleteEvent(eventId);
    successResponse(response, 200);
});
