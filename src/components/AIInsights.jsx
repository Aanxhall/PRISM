import { FaRobot } from "react-icons/fa";

function AIInsights({ reports }) {
  const totalReports = reports.length;

  const highPriority = reports.filter(
    (report) =>
      report.priority === "High" ||
      report.priority === "Critical"
  ).length;

  const categoryCount = {};

  reports.forEach((report) => {
    categoryCount[report.category] =
      (categoryCount[report.category] || 0) + 1;
  });

  const mostCommonCategory =
    Object.keys(categoryCount).length > 0
      ? Object.keys(categoryCount).reduce((a, b) =>
          categoryCount[a] > categoryCount[b] ? a : b
        )
      : "No Data";

  return (
    <div className="bg-[#111827] rounded-xl p-6 border border-gray-700 h-full">
      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-cyan-400 text-2xl" />
        <h2 className="text-xl font-bold text-white">
          AI Insights
        </h2>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1E293B] p-4 rounded-lg">
          <p className="text-cyan-400 font-semibold">
            📄 Total Reports
          </p>
          <p className="text-3xl font-bold text-white mt-2">
            {totalReports}
          </p>
        </div>

        <div className="bg-[#1E293B] p-4 rounded-lg">
          <p className="text-red-400 font-semibold">
            🚨 High Priority
          </p>
          <p className="text-3xl font-bold text-white mt-2">
            {highPriority}
          </p>
        </div>

        <div className="bg-[#1E293B] p-4 rounded-lg">
          <p className="text-green-400 font-semibold">
            📂 Most Common Category
          </p>
          <p className="text-white mt-2">
            {mostCommonCategory}
          </p>
        </div>

        <div className="bg-[#1E293B] p-4 rounded-lg">
          <p className="text-yellow-400 font-semibold">
            🤖 AI Status
          </p>
          <p className="text-white mt-2">
            Ready
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIInsights;