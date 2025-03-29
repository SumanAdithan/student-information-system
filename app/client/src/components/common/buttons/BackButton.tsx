import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BackButton = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    if (!pathname.endsWith('/view')) return null;

    return (
        <button
            onClick={() => navigate(-1)}
            className=' top-20 right-20 bg-primary text-white px-4 py-2  rounded-full hover:bg-font-secondary transition'
        >
            <ArrowLeft />
        </button>
    );
};
