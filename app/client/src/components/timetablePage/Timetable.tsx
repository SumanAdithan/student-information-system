export const Timetable = ({ days }: { days: any }) => {
    const periodKeys = ['one', 'two', 'three', 'four', 'five', 'six'];
    const rowSpanCount = days.length;
    const periods = [
        { period: 'I', time: '9:30-10:30' },
        { period: '', time: '10:30-10:45' },
        { period: 'II', time: '10:45-11:45' },
        { period: 'III', time: '11:45-12:45' },
        { period: '', time: '12:45-1:15' },
        { period: 'IV', time: '1:15-2:15' },
        { period: 'V', time: '2:15-3:15' },
        { period: '', time: '3:15-3:30' },
        { period: 'VI', time: '3:30-4:00' },
    ];
    return (
        <div className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7'>
            <div className='rounded-2xl bg-clip-border overflow-x-scroll font-secondary'>
                <table className='w-full divide-y divide-font-secondary min-w-[650px]'>
                    <thead className='bg-table-heading'>
                        <tr className='divide-x divide-font-secondary'>
                            <th className=' px-4 py-6'>Day/Period</th>
                            {periods.map(({ period, time }) => (
                                <th>
                                    <div>{period}</div>
                                    <div>{time}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-font-secondary'>
                        {days.map(([day, periods]: [string, any], index: number) => (
                            <tr key={day} className='divide-x divide-font-secondary'>
                                <td className='px-2 py-4 '>{day}</td>
                                <td>{periods.one}</td>

                                {index === 0 && <td rowSpan={rowSpanCount}>Break</td>}

                                <td>{periods.two}</td>
                                <td>{periods.three}</td>

                                {index === 0 && <td rowSpan={rowSpanCount}>Lunch</td>}

                                <td>{periods.four}</td>
                                <td>{periods.five}</td>

                                {index === 0 && <td rowSpan={rowSpanCount}>Break</td>}

                                <td>{periods.six}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
