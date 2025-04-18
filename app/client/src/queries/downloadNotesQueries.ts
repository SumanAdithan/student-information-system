import { addNotes, getAllNotesData } from '@api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllNotes = () => {
    return useQuery({
        queryKey: ['allNotes'],
        queryFn: getAllNotesData,
        retry: false,
    });
};

export const useDownloadNotesMutation = () => {
    const queryClient = useQueryClient();
    const addNotesMutation = useMutation({
        mutationFn: addNotes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allNotes'] });
        },
    });

    return { addNotesMutation };
};
