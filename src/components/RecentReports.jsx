function getStatusColor(priority) {
  switch (priority) {
    case "Critical":
      return "bg-red-500/20 text-red-400";
    case "High":
      return "bg-orange-500/20 text-orange-400";
    case "Medium":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-green-500/20 text-green-400";
  }
}

function RecentReports({ reports }) {
  const latestReports = reports.slice(0, 5);

  return (
    <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 h-full">
      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Reports
      </h2>

      {latestReports.length === 0 ? (
        <p className="text-slate-400">
          No reports submitted yet.
        </p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="text-left py-3">ID</th>
              <th className="text-left">Category</th>
              <th className="text-left">Location</th>
              <th className="text-left">Priority</th>
            </tr>
          </thead>

          <tbody>
            {latestReports.map((report) => (
              <tr
                key={report.id}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >
                <td className="py-4 text-white">
                  #{report.id}
                </td>

                <td className="text-slate-300">
                  {report.category}
                </td>

                <td className="text-slate-300">
                  {report.location}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(report.priority)}`}
                  >
                    {report.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentReports;