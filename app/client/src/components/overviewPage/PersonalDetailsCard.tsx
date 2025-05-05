import { SlideUp } from '@ui';

interface PersonalDetailsCardProps {
    personalDetails: Record<string, any>;
}

const personalDetailsCardConfig = {
    title: 'Personal Details',
};

export const PersonalDetailsCard = ({ personalDetails }: PersonalDetailsCardProps) => {
    const { title } = personalDetailsCardConfig;
    return (
        <SlideUp
            className='bg-white p-6 rounded-b-2xl xl:rounded-2xl  xl:shadow-section grow'
            initial={25}
            duration={0.5}
            delay={0.2}
        >
            <h1 className='text-2xl font-medium mb-10'>{title}</h1>
            <div className='flex justify-center'>
                <div className='grid xs:grid-cols-2 gap-y-2 xs:gap-y-10 xl:px-10 pb-8 text-lg sm:text-xl font-medium'>
                    {personalDetails.map((details: any, i: number) => {
                        return <div key={i} className='min-w-max'>{`${details[0]}: ${details[1]}`}</div>;
                    })}
                </div>
            </div>
        </SlideUp>
    );
};
