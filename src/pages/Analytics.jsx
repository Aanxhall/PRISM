import { useEffect, useState } from "react";
import API from "../api/api";

function Analytics() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------- Statistics ----------

  const totalReports = reports.length;

  const categoryCount = {};
  const locationCount = {};
  const priorityCount = {};

  reports.forEach((r) => {
    categoryCount[r.category] = (categoryCount[r.category] || 0) + 1;
    locationCount[r.location] = (locationCount[r.location] || 0) + 1;
    priorityCount[r.priority] = (priorityCount[r.priority] || 0) + 1;
  });

  const highestCategory =
    Object.keys(categoryCount).sort(
      (a, b) => categoryCount[b] - categoryCount[a]
    )[0] || "N/A";

  const highestLocation =
    Object.keys(locationCount).sort(
      (a, b) => locationCount[b] - locationCount[a]
    )[0] || "N/A";

  const highestPriority =
    Object.keys(priorityCount).sort(
      (a, b) => priorityCount[b] - priorityCount[a]
    )[0] || "N/A";

  const confidence =
    totalReports === 0
      ? 0
      : Math.min(95, 60 + totalReports * 3);

  const trend =
    totalReports > 10
      ? "Increasing"
      : totalReports > 5
      ? "Stable"
      : "Low Activity";

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1E293B]">

      <h1 className="text-5xl font-bold text-white">
        AI Crime Trend Prediction
      </h1>

      <p className="text-slate-400 mt-3">
        Predictive analytics generated from PRISM reports.
      </p>

      <div className="grid grid-cols-2 gap-8 mt-10">

        <div className="rounded-2xl bg-slate-900 p-8 border border-cyan-500">

          <h2 className="text-cyan-400 text-xl font-bold mb-6">
            📈 Current Trend
          </h2>

          <p className="text-5xl font-bold text-white">
            {trend}
          </p>

        </div>

        <div className="rounded-2xl bg-slate-900 p-8 border border-cyan-500">

          <h2 className="text-cyan-400 text-xl font-bold mb-6">
            🎯 Prediction Confidence
          </h2>

          <p className="text-5xl font-bold text-green-400">
            {confidence}%
          </p>

        </div>

        <div className="rounded-2xl bg-slate-900 p-8">

          <h3 className="text-cyan-400 text-lg mb-3">
            Most Reported Category
          </h3>

          <p className="text-3xl text-white">
            {highestCategory}
          </p>

        </div>

        <div className="rounded-2xl bg-slate-900 p-8">

          <h3 className="text-cyan-400 text-lg mb-3">
            Highest Risk Location
          </h3>

          <p className="text-3xl text-white">
            {highestLocation}
          </p>

        </div>

        <div className="rounded-2xl bg-slate-900 p-8">

          <h3 className="text-cyan-400 text-lg mb-3">
            Expected Priority
          </h3>

          <p className="text-3xl text-red-400">
            {highestPriority}
          </p>

        </div>

        <div className="rounded-2xl bg-slate-900 p-8">

          <h3 className="text-cyan-400 text-lg mb-3">
            AI Recommendation
          </h3>

          <p className="text-slate-300 leading-8">

            Increase surveillance in{" "}
            <span className="text-cyan-400">
              {highestLocation}
            </span>
            . Focus on
            <span className="text-cyan-400">
              {" "}{highestCategory}
            </span>
            {" "}cases and prioritize
            <span className="text-red-400">
              {" "}{highestPriority}
            </span>
            {" "}incidents.

          </p>

        </div>

      </div>

    </div>
  );
}

export default Analytics;