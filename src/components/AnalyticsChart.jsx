import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ reports }) {
  const categories = [
    "Cybercrime",
    "Pollution",
    "Child Labour",
    "Fraud",
    "Others",
  ];

  const data = categories.map((category) => ({
    category,
    reports: reports.filter(
      (report) => report.category === category
    ).length,
  }));

  return (
    <div className="bg-[#111827] rounded-xl p-6 border border-gray-700 shadow-lg">
      <h2 className="text-white text-xl font-bold mb-6">
        Reports by Category
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#374151" />

          <XAxis
            dataKey="category"
            stroke="#9CA3AF"
          />

          <YAxis stroke="#9CA3AF" />

          <Tooltip />

          <Bar
            dataKey="reports"
            fill="#06B6D4"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;