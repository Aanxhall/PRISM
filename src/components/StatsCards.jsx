import {
  FaFileAlt,
  FaRobot,
  FaExclamationTriangle,
  FaProjectDiagram,
} from "react-icons/fa";

function StatsCards({ reports }) {
  const stats = [
    {
      title: "Total Reports",
      value: reports.length,
      icon: <FaFileAlt />,
      color: "text-cyan-400",
      change: "Live",
    },
    {
      title: "AI Analyses",
      value: reports.length,
      icon: <FaRobot />,
      color: "text-violet-400",
      change: "Ready",
    },
    {
      title: "High Priority",
      value: reports.filter(
        (report) =>
          report.priority === "High" ||
          report.priority === "Critical"
      ).length,
      icon: <FaExclamationTriangle />,
      color: "text-red-400",
      change: "Live",
    },
    {
      title: "Categories",
      value: new Set(
        reports.map((report) => report.category)
      ).size,
      icon: <FaProjectDiagram />,
      color: "text-emerald-400",
      change: "Live",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mt-8">
      {stats.map((item) => (
        <div
          key={item.title}
          className="group relative overflow-hidden rounded-2xl
          border border-slate-700/50
          bg-white/5
          backdrop-blur-md
          p-6
          transition-all duration-300
          hover:scale-105
          hover:border-cyan-400/50
          hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition"></div>

          <div className="relative flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">{item.title}</p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {item.value}
              </h2>

              <p className="text-emerald-400 text-sm mt-4">
                {item.change}
              </p>
            </div>

            <div className={`text-4xl ${item.color}`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;