export default function Button({ children, type = "primary", onClick }) {
  const types = {
    primary: "bg-[#5e35b1] hover:bg-[#4527a0] text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    danger: "bg-rose-600 hover:bg-rose-700 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 text-white",
  };
  return (
    <button onClick={onClick} className={`${types[type]} px-4 py-2 rounded-xl text-xs font-bold transition-all`}>
      {children}
    </button>
  );
}