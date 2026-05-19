import Card from "./Card";

export default function StatCard({ title, value, icon, description, trendColor = "text-green-600" }) {
  return (
    <Card className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">{value}</h3>
        {description && <p className={`text-[11px] font-medium ${trendColor}`}>{description}</p>}
      </div>
      <div className="p-3.5 bg-[#f8faff] text-xl rounded-2xl text-[#5e35b1] border border-gray-50">
        {icon}
      </div>
    </Card>
  );
}