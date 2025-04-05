import { profile } from '@assets';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const LazyImage = ({ image, name, className }: { image: string; name: string; className?: string }) => {
    return (
        <LazyLoadImage
            src={image ? image : profile}
            alt={name}
            className={className}
            wrapperClassName={className}
            effect='blur'
            onError={(e) => (e.currentTarget.src = profile)}
        />
    );
};
