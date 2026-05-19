export default function Table({ headers = [], children }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full border-collapse text-left text-xs bg-white">
        <thead className="bg-gray-50 text-gray-400 font-bold uppercase border-b border-gray-100">
          <tr>{headers.map((h, i) => <th key={i} className="px-5 py-3">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-gray-600">{children}</tbody>
      </table>
    </div>
  );
}