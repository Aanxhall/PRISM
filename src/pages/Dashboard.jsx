import { useState, useEffect } from "react";
import API from "../api/api";
import AIIntelligence from "../components/AIIntelligence";
import StatsCards from "../components/StatsCards";
import AnalyticsChart from "../components/AnalyticsChart";
import AIInsights from "../components/AIInsights";
import RecentReports from "../components/RecentReports";
import CategoryChart from "../components/CategoryChart";
import AIChatbot from "../components/AIChatbot";

function Dashboard() {
  const [reports, setReports] = useState([]);

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

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1E293B]">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Welcome back, Admin 👋 Here's what's happening today.
        </p>
      </div>

      {/* Stats */}
      <StatsCards reports={reports} />

      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-6 mt-8">

  <div className="col-span-2">
    <AnalyticsChart reports={reports} />
  </div>

  <AIIntelligence reports={reports} />

</div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-6 mt-8">

        <div className="col-span-2">
          <RecentReports reports={reports} />
        </div>

        <CategoryChart reports={reports} />

      </div>

    <AIChatbot />
    </div>
  );
}

export default Dashboard;