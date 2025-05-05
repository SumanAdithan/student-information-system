import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideUpProps {
    children: ReactNode;
    className: string;
    initial: number;
    duration?: number;
    delay?: number;
}

export const SlideUp = ({ children, className, initial, duration = 0, delay = 0 }: SlideUpProps) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: initial }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay }}
        >
            {children}
        </motion.div>
    );
};
