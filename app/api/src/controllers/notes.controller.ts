import { catchAsyncError } from '@middlewares';
import { NotesService } from '@services';
import { Notes, NotesDto } from '@sis/types';
import { ErrorHandler, successResponse } from '@utils';
import { Request } from 'express';

export const addNotes = catchAsyncError(async (request: Request<{}, {}, NotesDto>, response, next) => {
    const notes = request.body as Notes;
    const createNotes = await NotesService.createNotes(notes, request.file);
    if (!createNotes.success) return next(new ErrorHandler(400, 'Unable to create a notes'));
    successResponse(response, 201, null, 'Notes Created');
});

export const getAllNotes = catchAsyncError(async (request, response, next) => {
    const notes = await NotesService.getAllNotes();
    successResponse(response, 200, notes);
});

export const deleteNotes = catchAsyncError(async (request: Request<{ notesId: string }>, response, next) => {
    const { notesId } = request.params;
    const deleteNotes = await NotesService.deleteNotes(notesId);
    successResponse(response, 200);
});
