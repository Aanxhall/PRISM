import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#06B6D4",
  "#8B5CF6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

function CategoryChart({ reports }) {
  const categories = [
    "Cybercrime",
    "Pollution",
    "Child Labour",
    "Fraud",
    "Others",
  ];

  const data = categories.map((category) => ({
    name: category,
    value: reports.filter(
      (report) => report.category === category
    ).length,
  }));

  return (
    <div className="bg-[#111827] rounded-2xl border border-slate-700 p-6 h-full">
      <h2 className="text-xl font-bold text-white mb-5">
        Category Distribution
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}
            outerRadius={85}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;