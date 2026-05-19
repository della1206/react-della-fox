export default function SelectField({ label, options = [] }) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</label>
      <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#5e35b1] cursor-pointer">
        {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}