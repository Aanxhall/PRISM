function AIIntelligence({ reports }) {
  const total = reports.length;

  const critical = reports.filter(
    (r) => r.priority === "Critical"
  ).length;

  const high = reports.filter(
    (r) => r.priority === "High"
  ).length;

  // Most Reported Category
  const categoryCount = {};

  reports.forEach((r) => {
    categoryCount[r.category] =
      (categoryCount[r.category] || 0) + 1;
  });

  const topCategory =
    Object.keys(categoryCount).length > 0
      ? Object.keys(categoryCount).reduce((a, b) =>
          categoryCount[a] > categoryCount[b] ? a : b
        )
      : "No Data";

  // Hotspot Location
  const locationCount = {};

  reports.forEach((r) => {
    locationCount[r.location] =
      (locationCount[r.location] || 0) + 1;
  });

  const hotspot =
    Object.keys(locationCount).length > 0
      ? Object.keys(locationCount).reduce((a, b) =>
          locationCount[a] > locationCount[b] ? a : b
        )
      : "No Data";

  // AI Recommendation
  let recommendation =
    "No significant threats detected.";

  if (critical > 0) {
    recommendation =
      "Immediate intervention required for critical incidents.";
  } else if (high > 2) {
    recommendation =
      "Increase monitoring in affected areas and deploy additional officers.";
  } else if (topCategory === "Cybercrime") {
    recommendation =
      "Conduct cyber awareness campaigns and strengthen digital monitoring.";
  } else if (topCategory === "Pollution") {
    recommendation =
      "Schedule environmental inspections for reported locations.";
  }

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        🧠 AI Intelligence Summary
      </h2>

      <div className="space-y-4 text-slate-200">

        <div className="flex justify-between">
          <span>Total Reports</span>
          <span>{total}</span>
        </div>

        <div className="flex justify-between">
          <span>Critical Cases</span>
          <span className="text-red-400">{critical}</span>
        </div>

        <div className="flex justify-between">
          <span>High Priority</span>
          <span className="text-orange-400">{high}</span>
        </div>

        <div className="flex justify-between">
          <span>Most Reported Category</span>
          <span className="text-cyan-400">{topCategory}</span>
        </div>

        <div className="flex justify-between">
          <span>Hotspot</span>
          <span className="text-yellow-400">{hotspot}</span>
        </div>

        <hr className="border-slate-700" />

        <div>
          <p className="font-semibold text-cyan-300 mb-2">
            AI Recommendation
          </p>

          <p className="text-slate-300 leading-7">
            {recommendation}
          </p>
        </div>

      </div>

    </div>
  );
}

export default AIIntelligence;