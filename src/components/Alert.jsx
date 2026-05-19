export default function Alert({ title, message, type = "info" }) {
  const styles = {
    info: "bg-blue-50 text-blue-800 border-blue-100",
    success: "bg-emerald-50 text-emerald-800 border-emerald-100",
    warning: "bg-amber-50 text-amber-800 border-amber-100",
  };
  return (
    <div className={`p-4 rounded-xl border text-xs ${styles[type]}`}>
      <p className="font-bold mb-0.5">{title}</p>
      <p className="opacity-90">{message}</p>
    </div>
  );
}