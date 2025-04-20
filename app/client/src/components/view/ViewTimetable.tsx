import { RootState } from '@store';
import { getTimetableTableData } from '@utils';
import { Timetable } from '@components';
import { useSelector } from 'react-redux';

export const ViewTimetable = () => {
    const { timetable } = useSelector((state: RootState) => state.timetable);
    const days = Object.entries(timetable.timetable);
    return <Timetable days={days} />;
};
