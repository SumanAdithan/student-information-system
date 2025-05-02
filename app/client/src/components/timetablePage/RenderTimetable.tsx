import { PERIODS as periods } from '@constants';

export const RenderTimetable = ({ data }: { data: any }) => {
    const rowSpanCount = data.length;
    return (
        <table className='bg-primary-light text-center w-full divide-y divide-font-secondary min-w-[650px]'>
            <thead className='bg-primary'>
                <tr className='divide-x divide-font-secondary'>
                    <th className='px-4 py-6'>Day/Period</th>
                    {periods.map(({ period, time }, index) => (
                        <th key={index}>
                            <div>{period}</div>
                            <div>{time}</div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className='divide-y divide-font-secondary'>
                {data.map(([day, periods]: [string, any], index: number) => (
                    <tr key={day} className='divide-x divide-font-secondary'>
                        <td className='bg-primary font-semibold px-2 py-4'>{day}</td>
                        <td>{periods.one}</td>

                        {index === 0 && (
                            <td rowSpan={rowSpanCount} className='bg-primary font-semibold'>
                                Break
                            </td>
                        )}

                        <td>{periods.two}</td>
                        <td>{periods.three}</td>

                        {index === 0 && (
                            <td rowSpan={rowSpanCount} className='bg-primary font-semibold'>
                                Lunch
                            </td>
                        )}

                        <td>{periods.four}</td>
                        <td>{periods.five}</td>

                        {index === 0 && (
                            <td rowSpan={rowSpanCount} className='bg-primary font-semibold'>
                                Break
                            </td>
                        )}

                        <td>{periods.six}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
