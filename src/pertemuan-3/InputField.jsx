export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-5">
      <label className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-lg"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}