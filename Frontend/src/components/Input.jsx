function InputField({
  type = "text",
  name,
  placeholder,
  onChange,
  required = true,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className="border px-3 py-2 rounded w-full my-2"
    />
  );
}

export default InputField;