import { addNotesData, deleteNotesById, getAllNotes, getNotesById } from '@models';
import { Notes } from '@sis/types';
import { AwsService } from './aws.service';

const awsService = new AwsService();

export class NotesService {
    static async createNotes(notes: Notes, file: Express.Multer.File) {
        if (!file) return { success: false };
        const newNotes = await addNotesData(notes);

        const notesFile = await awsService.uploadFile(
            'notes',
            file.originalname,
            `${newNotes.subjectName}(${newNotes.code})`,
            file.buffer
        );
        if (!notesFile.success) return { success: false };

        newNotes.file = notesFile.fileName;
        await newNotes.save();

        return { success: true };
    }

    static async getAllNotes() {
        return await getAllNotes();
    }

    static async deleteNotes(notesId: string) {
        const notes = await getNotesById(notesId);
        if (!notes) return { success: false, error: 'Notes not found' };

        if (notes.file) {
            const deleteNotes = await awsService.deleteFile(`notes/${notes.file}`);
            if (!deleteNotes.success) return { success: false, error: `Can't delete Notes` };
        }

        await deleteNotesById(notesId);
        return { success: true };
    }
}
