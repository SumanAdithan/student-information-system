import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

export const SearchBar = ({ value, placeholder, onChange }: SearchBarProps) => {
    return (
        <div className='relative'>
            <Search className='absolute left-3 text-font-primary sm:left-2.5 top-2.5' size={20} />
            <input
                type='text'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className='bg-search-input text-font-primary placeholder-font-primary rounded-lg pl-10 pr-4 py-2 w-[150px] sm:w-full  outline-none focus:ring-2 focus:ring-blue-500'
            />
        </div>
    );
};
