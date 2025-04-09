import { activePayBtn, edit, inActivePayBtn, trash } from '@assets';
import { PayDues } from '@sis/types';
import { RootState, setModal, setPayDues } from '@store';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';

const columnHelper = createColumnHelper<any>();

export const DuesColumn = () => {
    const dispatch = useDispatch();
    const { role } = useSelector((state: RootState) => state.profile);

    const payClick = (payDues: PayDues) => {
        dispatch(setPayDues(payDues));
        dispatch(setModal({ active: true, status: 'payDues' }));
    };

    const handleEditClick = (payDues: PayDues) => {
        dispatch(setPayDues(payDues));
        dispatch(setModal({ active: true, status: 'editDues' }));
    };

    const duesColumnConfig = [
        columnHelper.accessor('category', { header: 'Category' }),
        columnHelper.accessor('total', { header: 'Total' }),
        columnHelper.accessor('online', { header: 'Online' }),
        columnHelper.accessor('offline', { header: 'Offline' }),
        columnHelper.accessor('pending', { header: 'Pending' }),
        role === 'student'
            ? columnHelper.display({
                  header: 'Pay Now',
                  cell: ({ row }) => (
                      <div className='flex justify-center'>
                          <button
                              onClick={() => payClick(row.original)}
                              disabled={row.original.fully_paid ? true : false}
                          >
                              <img
                                  src={row.original.fully_paid ? inActivePayBtn : activePayBtn}
                                  alt='true'
                                  className='w-20'
                              />
                          </button>
                      </div>
                  ),
              })
            : role === 'admin'
            ? columnHelper.display({
                  header: 'Actions',
                  cell: ({ row }) => (
                      <div className='flex justify-center gap-2'>
                          <img
                              src={edit}
                              alt='view'
                              className='w-6 h-6 transition-transform duration-300 hover:scale-125'
                              onClick={() => handleEditClick(row.original)}
                          />
                      </div>
                  ),
              })
            : null,
    ].filter(Boolean);

    return { duesColumnConfig };
};
