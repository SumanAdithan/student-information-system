import { CircularTable, Loading } from '@components';
import { useGetAllCircular } from '@queries';

export const CircularPage = () => {
    const circularConfig = {
        title: 'Circular',
    };

    const getAllCircular = useGetAllCircular();
    const { data, isLoading, error } = getAllCircular;

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching circular data</div>;
    return <CircularTable title={circularConfig.title} data={data?.circulars} />;
};
