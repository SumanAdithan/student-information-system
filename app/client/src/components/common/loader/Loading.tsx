import { logo } from '@assets';

export const Loading = () => {
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='relative w-24 h-24'>
                <div className='absolute inset-0 border-4 border-gray-300 rounded-full'></div>
                <div className='absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin'></div>

                <div className='absolute inset-0 flex justify-center items-center'>
                    <div className='w-12 h-12 rounded-sm overflow-hidden'>
                        <img src={logo} alt='Logo' className='w-full h-full' />
                    </div>
                </div>
            </div>
        </div>
    );
};
