import { useEffect, useState } from "react";
import API from "../api/api";

function AIInsights() {
  const [reports, setReports] = useState([]);
  const [selectedInsight, setSelectedInsight] = useState("");

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

  const generateInsight = async (report) => {
    try {
      setSelectedInsight("Generating AI Analysis...");

      const res = await API.post("/ai-insights", report);

      setSelectedInsight(res.data.insight);
    } catch (err) {
      setSelectedInsight(
        "Unable to generate AI analysis. Gemini quota exceeded."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-8">

      <h1 className="text-5xl font-bold text-white">
        AI Insights
      </h1>

      <p className="text-slate-400 mt-3">
        Generate AI-powered analysis for every citizen report.
      </p>

      <div className="grid grid-cols-2 gap-8 mt-8">

        {/* Reports */}

        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-white text-2xl mb-6">
            Reports
          </h2>

          <div className="space-y-4">

            {reports.map((report) => (

              <div
                key={report.id}
                className="bg-slate-800 rounded-xl p-4"
              >

                <h3 className="text-white font-semibold">
                  {report.title}
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  {report.category}
                </p>

                <button
                  onClick={() => generateInsight(report)}
                  className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg"
                >
                  Generate AI Insight
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* AI Output */}

        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-cyan-400 text-3xl font-bold mb-6">
              🤖 AI Analysis
          </h2>

          <pre className="whitespace-pre-wrap text-slate-200 leading-8">
            {selectedInsight ||
              "Select any report to generate AI analysis."}
          </pre>

        </div>

      </div>

    </div>
  );
}

export default AIInsights;