type Props = {
    children: React.ReactNode;
};

type InputProps = {
    type: string;
    id: string;
    placeholder: string;
    name: string;
};

export const FormGroup = ({ children }: Props) => {
    return <div className='flex flex-col mt-4'>{children}</div>;
};

export const Label = ({ name }: { name: string }) => (
    <label
        className='pb-2 text-xs font-bold capitalize cursor-pointer'
        htmlFor={name}>
        {name}
    </label>
);

export const Input = ({ type, id, placeholder, name }: InputProps) => (
    <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        className='w-full text-sm p-4 border border-[rgb(207,207,207)] rounded-lg'
    />
);
