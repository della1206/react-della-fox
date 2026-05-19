export default function Badge({ children, type = "primary" }) {
  const types = {
    gold: "bg-amber-100 text-amber-800 border border-amber-200",
    silver: "bg-slate-100 text-slate-700 border border-slate-200",
    bronze: "bg-orange-100 text-orange-800 border border-orange-200",
    active: "bg-emerald-50 text-emerald-700",
    promo: "bg-purple-100 text-purple-700 animate-pulse",
  };
  return <span className={`${types[type]} px-2.5 py-1 rounded-lg text-[11px] font-bold inline-block`}>{children}</span>;
}