export default function SelectField({
  label,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <div className="mb-5">
      <label className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-lg"
      >
        <option value="">-- Pilih --</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}