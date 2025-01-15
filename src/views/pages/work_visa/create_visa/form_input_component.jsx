export const FormInput = ({ label, type = "text", value, onChange, name, options = [], required = false, ...props }) => {
    return (
        <div className="flex lg:items-center lg:gap-3 lg:flex-row flex-col justify-between">
            <label className="block lg:w-40 text-gray-700 text-xs font-medium lg:mb-2 mb-0">{label}:</label>
            {type === 'select' ? (
                <select
                    value={value}
                    onChange={onChange}
                    name={name}
                    className="lg:w-50 bg-inherit w-full border border-gray-300 px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={required}
                    {...props}
                >
                    <option className="text-xs" value="">Выберите {label}</option>
                    {options.map((option) => (
                        <option className="text-xs" key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    name={name}
                    className="lg:w-50 bg-inherit w-full border border-gray-300 px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={required}
                    autoComplete="off"
                    {...props}
                />
            )}
        </div>
    );
};
