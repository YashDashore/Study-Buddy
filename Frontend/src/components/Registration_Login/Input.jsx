function InputField({ label, name, type, value, onChange }) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-base font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>
  );
}

export default InputField;
