import { useQuery } from '@tanstack/react-query';
import { getAllAssignmentData, getAuthenticatedAssignment } from '@api';

export const useGetAuthenticatedAssignment = () => {
    return useQuery({
        queryKey: ['authenticatedAssignment'],
        queryFn: getAuthenticatedAssignment,
    });
};

export const useGetAllAssignment = () => {
    return useQuery({
        queryKey: ['allAssignments'],
        queryFn: getAllAssignmentData,
        retry: false,
    });
};
