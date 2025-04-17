import { getAllNotesData } from '@api';
import { useQuery } from '@tanstack/react-query';

export const useGetAllNotes = () => {
    return useQuery({
        queryKey: ['allStudents'],
        queryFn: getAllNotesData,
        retry: false,
    });
};
