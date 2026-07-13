import { useEffect, useState } from "react";
import API from "../api/api";

function KnowledgeGraph() {
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

  const grouped = {};

  reports.forEach((report) => {
    if (!grouped[report.category]) {
      grouped[report.category] = [];
    }

    grouped[report.category].push(report);
  });

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1E293B]">

      <h1 className="text-5xl font-bold text-white mb-2">
        Knowledge Graph
      </h1>

      <p className="text-slate-400 mb-10">
        AI Relationship Network between Categories, Locations and Priority Levels
      </p>

      <div className="space-y-10">

        {Object.keys(grouped).map((category) => (

          <div
            key={category}
            className="rounded-2xl bg-slate-900 border border-cyan-500/30 p-8 shadow-xl"
          >

            <h2 className="text-3xl text-cyan-400 font-bold mb-8">
              {category}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {grouped[category].map((report) => (

                <div
                  key={report.id}
                  className="rounded-xl bg-slate-800 border border-slate-700 p-6 hover:border-cyan-400 transition duration-300 hover:scale-105"
                >

                  <h3 className="text-white text-xl font-semibold">
                    📍 {report.location}
                  </h3>

                  <p className="text-slate-400 mt-3">
                    {report.title}
                  </p>

                  <div className="mt-5 flex justify-between">

                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300">
                      {report.priority}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                      {report.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default KnowledgeGraph;