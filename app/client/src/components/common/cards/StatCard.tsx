interface StatCardProps {
    name: string;
    value: string;
    icon: string;
}

export const StatCard = ({ name, value, icon }: StatCardProps) => {
    return (
        <div className='flex flex-col sm:flex-row items-center w-80  px-4 py-1.5 sm:py-3 bg-white rounded-4xl border-2 border-primary shadow-sm shadow-primary'>
            <div className='w-1/2 flex justify-center'>
                <div className='w-10 h-10 sm:w-14 sm:h-14 flex-shrink-0'>
                    <img src={icon} alt={name} className='w-full h-full' />
                </div>
            </div>
            <div className='w-1/2 flex justify-center sm:justify-start'>
                <div className='text-lg sm:text-xl font-medium'>
                    <h1 className='text-center'>{name}</h1>
                    <p className='text-center'>{value}</p>
                </div>
            </div>
        </div>
    );
};
