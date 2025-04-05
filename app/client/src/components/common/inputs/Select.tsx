import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    isOpen: boolean;
    toggleOpen: () => void;
    onClose: () => void;
}

export const Select = ({ value, onChange, options, isOpen, toggleOpen, onClose }: SelectProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedLabel = options.find((opt) => opt.value === value)?.label || 'Select';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className='relative min-' ref={dropdownRef}>
            <button
                type='button'
                onClick={toggleOpen}
                className='w-full bg-search-input text-font-primary rounded-lg py-2 px-4 pr-10 font-medium text-left relative cursor-pointer'
            >
                {selectedLabel}
                <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-font-primary' size={18} />
            </button>

            {isOpen && (
                <ul className='absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden'>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                toggleOpen();
                            }}
                            className='px-3 py-2 hover:bg-search-input text-font-primary cursor-pointer whitespace-nowrap'
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
