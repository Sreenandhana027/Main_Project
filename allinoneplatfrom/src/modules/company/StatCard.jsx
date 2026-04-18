export default function StatCard({ title, value, primary }) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-sm ${
        primary ? "bg-blue-600 text-white" : "bg-white"
      }`}
    >
      <p className={`text-sm ${primary ? "text-blue-100" : "text-gray-500"}`}>
        {title}
      </p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}
