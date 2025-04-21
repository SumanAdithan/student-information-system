import { RootState } from '@store';
import { getTimetableTableData } from '@utils';
import { Timetable } from '@components';
import { useSelector } from 'react-redux';

export const ViewTimetable = () => {
    const timetableConfig = {
        title: 'Timetable',
    };

    const { timetable } = useSelector((state: RootState) => state.timetable);
    const { days, details } = getTimetableTableData(timetable);

    return <Timetable title={timetableConfig.title} data={days} details={details} />;
};
