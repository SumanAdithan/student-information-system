import { useFormContext } from 'react-hook-form';

interface Options {
    label: string;
    value: number | string;
}

interface InputFieldProps {
    data: {
        label: string;
        type: string;
        name: string;
        float?: boolean;
        valueAsNumber?: boolean;
        placeholder?: string;
        options?: Options[];
        disabled?: boolean;
    };
    register?: any;
    error?: string;
}

export const InputField = ({ data, register, error }: InputFieldProps) => {
    const { label, float, type, valueAsNumber, placeholder = '', name, options, disabled = false } = data;
    const { setValue } = useFormContext();

    return (
        <div className='flex flex-col space-y-1'>
            <label className='text-md text-font-primary font-semibold'>{label}</label>
            {type === 'select' && options ? (
                <select
                    className='w-full px-4 py-2 bg-search-input text-font-primary placeholder-font-primary  rounded-md'
                    disabled={disabled}
                    {...register(name, {
                        setValueAs: (val: any) => (valueAsNumber ? (val === '' ? undefined : Number(val)) : val || ''),
                    })}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    accept={type === 'file' ? 'image/*' : undefined}
                    step={float ? '0.01' : '1'}
                    className='w-full px-4 py-2 bg-search-input text-font-primary placeholder-font-primary  rounded-md'
                    placeholder={placeholder}
                    disabled={disabled}
                    {...register(name, {
                        setValueAs: (value: any) => {
                            if (type === 'number') return value === '' ? undefined : Number(value);

                            return value;
                        },
                    })}
                />
            )}
            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>
    );
};
