import { ReactNode } from 'react';

interface MainProps {
    children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
    return <div className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>{children}</div>;
};
