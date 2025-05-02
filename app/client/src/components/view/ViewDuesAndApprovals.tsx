import { tickMark, xMark } from '@assets';
import { RootState } from '@store';
import { getDuesAndApprovalsData } from '@utils';
import { useSelector } from 'react-redux';

export const ViewDuesAndApprovals = () => {
    const { duesAndApprovals } = useSelector((state: RootState) => state.duesAndApprovals);
    const { details, approvals } = getDuesAndApprovalsData(duesAndApprovals);

    return (
        <div className='bg-white p-6 pb-10 rounded-2xl shadow-section mb-7'>
            <h1 className='text-2xl font-medium mb-4'>Dues And Approvals</h1>
            <div className='flex items-center justify-between gap-16'>
                <div className='max-w-[500px] grid xs:grid-cols-2 gap-y-2 xs:gap-y-10 xl:pl-10 text-md sm:text-xl font-medium'>
                    {details.map((detail, index) => (
                        <div key={index} className='text-nowrap'>
                            {detail[0]}: {`${detail[1]}`}
                        </div>
                    ))}
                </div>
                <div className='rounded-2xl border bg-clip-border overflow-hidden '>
                    <table className='bg-primary-light  divide-y divide-font-secondary  min-w-[500px] '>
                        <thead className='bg-primary font-semibold'>
                            <tr className='divide-x divide-font-secondary text-lg'>
                                <th className='px-4 py-6'>Faculty</th>
                                <th className='px-4 py-6'>Approved</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-font-secondary font-medium'>
                            <tr className='divide-x divide-font-secondary'>
                                <td className='p-4'>Accountant</td>
                                <td className='flex justify-center items-center h-14 p-4'>
                                    {approvals?.accountant === true ? (
                                        <img src={tickMark} alt='true' className='w-3' />
                                    ) : (
                                        <img src={xMark} alt='false' className='w-3' />
                                    )}
                                </td>
                            </tr>
                            <tr className='divide-x divide-font-secondary'>
                                <td className='p-4'>Librarian</td>
                                <td className='flex justify-center items-center h-14 p-4'>
                                    {approvals?.librarian === true ? (
                                        <img src={tickMark} alt='true' className='w-3' />
                                    ) : (
                                        <img src={xMark} alt='false' className='w-3' />
                                    )}
                                </td>
                            </tr>
                            <tr className='divide-x divide-font-secondary'>
                                <td className='p-4'>Head of Department</td>
                                <td className='flex justify-center items-center h-14 p-4'>
                                    {approvals?.head_of_department === true ? (
                                        <img src={tickMark} alt='true' className='w-3' />
                                    ) : (
                                        <img src={xMark} alt='false' className='w-3' />
                                    )}
                                </td>
                            </tr>
                            <tr className='divide-x divide-font-secondary'>
                                <td className='p-4'>Administrative Officer</td>
                                <td className='flex justify-center items-center h-14 p-4'>
                                    {approvals?.administrative_officer === true ? (
                                        <img src={tickMark} alt='true' className='w-3' />
                                    ) : (
                                        <img src={xMark} alt='false' className='w-3' />
                                    )}
                                </td>
                            </tr>
                            <tr className='divide-x divide-font-secondary'>
                                <td className='p-4'>Principal</td>
                                <td className='flex justify-center items-center h-14 p-4'>
                                    {approvals?.principal === true ? (
                                        <img src={tickMark} alt='true' className='w-3' />
                                    ) : (
                                        <img src={xMark} alt='false' className='w-3' />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
