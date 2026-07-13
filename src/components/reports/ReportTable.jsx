import { toast } from "react-toastify";
function ReportTable({
  reports,
  deleteReport,
  editReport,
}) {
 return (
    <div className="mt-10 rounded-2xl border border-slate-700 bg-white/5 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-slate-400">
          No reports submitted yet.
        </p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700 text-slate-300">
              <th className="pb-4">Title</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Priority</th>
              <th className="pb-4">Status</th>
              <th className="pb-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-b border-slate-800"
              >
                <td className="py-4 text-white">
                  {report.title}
                </td>

                <td className="text-slate-300">
                  {report.category}
                </td>

                <td className="text-yellow-400">
                  {report.priority}
                </td>

                <td>
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      report.status === "Submitted"
        ? "bg-green-500/20 text-green-400"
        : report.status === "Pending"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-blue-500/20 text-blue-400"
    }`}
  >
    {report.status}
  </span>
</td>

                <td className="text-center">
                  <div className="flex justify-center gap-2">
 <button
  onClick={() => editReport(report)}
  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
>
  Edit
</button>

  <button
    onClick={() => {
      deleteReport(report.id);
      toast.success("Report deleted successfully!");
    }}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
  >
    Delete
  </button>
</div>
                    
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReportTable;