import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TablePageination = ({ name, table }: any) => {
    return (
        <div className='flex flex-col md:flex-row justify-between mt-8 space-x-2 items-center'>
            <div className='flex items-center'>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className={`text-sm px-3 py-1 border-2 rounded-md bg-pageination-btn text-font-primary ${
                        !table.getCanPreviousPage()
                            ? 'text-font-secondary border-none'
                            : 'text-font-primary border-primary'
                    }`}
                >
                    <ChevronLeft size={18} />
                </button>
                <span className='mx-2 text-sm font-medium text-font-primary'>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className={`text-sm px-3 py-1 border-2 bg-pageination-btn rounded-md ${
                        table.getCanNextPage() ? 'text-font-primary border-primary' : 'text-font-secondary border-none'
                    }`}
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            <div className='text-md font-medium text-font-primary tracking-wider mt-5 md:mt-0'>
                Total {name}: {table.getRowCount()}
            </div>
        </div>
    );
};
