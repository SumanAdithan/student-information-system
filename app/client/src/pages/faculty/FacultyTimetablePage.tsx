import { FacultyTimetable, ViewTimetable } from '@components';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

export const FacultyTimetablePage = () => {
    const FacultyTimetableConfig = {
        title: 'TImetable',
    };
    const { view } = useSelector((state: RootState) => state.action);

    return <>{view ? <ViewTimetable /> : <FacultyTimetable title={FacultyTimetableConfig.title} />}</>;
};
