import { addEvent, deleteEvent, getAllEventData } from '@api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllEvent = () => {
    return useQuery({
        queryKey: ['allEvents'],
        queryFn: getAllEventData,
        retry: false,
    });
};

export const useEventMutation = () => {
    const queryClient = useQueryClient();
    const addEventMutation = useMutation({
        mutationFn: addEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allEvents'] });
        },
    });

    const deleteEventMutation = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allEvents'] });
        },
    });

    return { addEventMutation, deleteEventMutation };
};
