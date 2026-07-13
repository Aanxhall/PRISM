import { useState, useEffect } from "react";
import ReportForm from "../components/reports/ReportForm";
import ReportTable from "../components/reports/ReportTable";
import API from "../api/api";

function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  // AI Insight
  const [aiInsight, setAiInsight] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await API.get("/reports");
      setReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add Report
  const addReport = async (newReport) => {
    try {
      await API.post("/reports", newReport);
      fetchReports();
    } catch (error) {
      console.error(error);
    }
  };

  // Update Report
  const updateReport = async (updatedReport) => {
    try {
      await API.put(`/reports/${updatedReport.id}`, updatedReport);

      fetchReports();
      setSelectedReport(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Report
  const deleteReport = async (id) => {
    try {
      await API.delete(`/reports/${id}`);
      fetchReports();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit Report
  const editReport = (report) => {
    setSelectedReport(report);
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      report.category === categoryFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      report.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPriority
    );
  });

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1E293B]">

      <h1 className="text-5xl font-extrabold text-white">
        Reports
      </h1>

      <p className="mt-3 text-cyan-400 text-lg font-semibold">
        Total Reports: {reports.length}
      </p>

      <p className="text-slate-400 mt-3 text-lg">
        Submit and manage intelligence reports.
      </p>

      <div className="mt-8">
        <ReportForm
          addReport={addReport}
          updateReport={updateReport}
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
          setAiInsight={setAiInsight}
        />
      </div>

      {/* AI Analysis Card */}
      {aiInsight && (
        <div className="mt-8 rounded-2xl border border-cyan-500/30 bg-slate-900/70 backdrop-blur-md p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            🤖 AI Crime Analysis
          </h2>

          <pre className="text-white whitespace-pre-wrap leading-8 text-base">
            {aiInsight}
          </pre>
        </div>
      )}

      <div className="mt-8">
        <input
          type="text"
          placeholder="🔍 Search Reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 text-white outline-none focus:border-cyan-400"
        />

        <div className="flex gap-4 mt-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-white"
          >
            <option value="All">All Categories</option>
            <option value="Cybercrime">Cybercrime</option>
            <option value="Pollution">Pollution</option>
            <option value="Child Labour">Child Labour</option>
            <option value="Fraud">Fraud</option>
            <option value="Others">Others</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-white"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <ReportTable
          reports={filteredReports}
          deleteReport={deleteReport}
          editReport={editReport}
        />
      </div>
    </div>
  );
}

export default Reports;