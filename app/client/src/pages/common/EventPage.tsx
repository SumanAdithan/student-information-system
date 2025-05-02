import { DisplayEvent, Loading } from '@components';
import { useGetAllEvent } from '@queries';

export const EventPage = () => {
    const getAllEvent = useGetAllEvent();
    const { data, isLoading, error } = getAllEvent;

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching event data</div>;
    return <DisplayEvent events={data?.events} />;
};
