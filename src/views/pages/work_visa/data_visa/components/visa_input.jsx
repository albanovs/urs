const VisaInput = ({ label, type, name, value, onChange, options }) => (
    <div className="w-full">
        <label className="block text-gray-400">{label}:</label>
        {type === 'select' ? (
            <select name={name} value={value} onChange={onChange} className="form-control text-xs">
                {options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="form-control text-xs"
            />
        )}
    </div>
);

export default VisaInput;