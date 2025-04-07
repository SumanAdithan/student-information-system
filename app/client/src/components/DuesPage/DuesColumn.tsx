import { activePayBtn, inActivePayBtn } from '@assets';
import { RootState } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useSelector } from 'react-redux';

const columnHelper = createColumnHelper<any>();

export const DuesColumn = () => {
    const { role } = useSelector((state: RootState) => state.profile);

    const duesColumnConfig = [
        columnHelper.accessor('category', { header: 'Category' }),
        columnHelper.accessor('total', { header: 'Total' }),
        columnHelper.accessor('paid', { header: 'Paid' }),
        columnHelper.accessor('pending', { header: 'Pending' }),
        role === 'student'
            ? columnHelper.display({
                  header: 'Pay Now',
                  cell: ({ row }) => (
                      <div className='flex justify-center'>
                          <img
                              src={row.original.fully_paid ? inActivePayBtn : activePayBtn}
                              alt='true'
                              className='w-20'
                          />
                      </div>
                  ),
              })
            : null,
    ].filter(Boolean);

    return { duesColumnConfig };
};
