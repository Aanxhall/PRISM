import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaRobot,
  FaChartBar,
  FaProjectDiagram,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/",
  },
  {
    name: "Reports",
    icon: <FaFileAlt />,
    path: "/reports",
  },
  {
    name: "AI Insights",
    icon: <FaRobot />,
    path: "/ai-insights",
  },
  {
    name: "Analytics",
    icon: <FaChartBar />,
    path: "/analytics",
  },
  {
    name: "Knowledge Graph",
    icon: <FaProjectDiagram />,
    path: "/knowledge-graph",
  },
  {
    name: "Settings",
    icon: <FaCog />,
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="w-72 bg-[#0B1120] border-r border-slate-800 flex flex-col">

      {/* Logo */}

      <div className="px-8 py-8">

        <h1 className="text-3xl font-extrabold tracking-wide">

          <span className="text-cyan-400">P</span>

          <span className="text-white">RISM</span>

        </h1>

        <p className="text-slate-500 text-sm mt-2">
          AI Social Intelligence
        </p>

      </div>

      {/* Navigation */}

      <div className="flex-1 px-4">

        {menuItems.map((item) => (
  <NavLink
    key={item.name}
    to={item.path}
    className={({ isActive }) =>
      `flex items-center gap-4 p-4 rounded-xl mb-2 transition-all duration-300 ${
        isActive
          ? "bg-cyan-500 text-black"
          : "text-slate-300 hover:bg-cyan-500 hover:text-black"
      }`
    }
  >
    <div className="text-xl">{item.icon}</div>
    <p className="font-medium">{item.name}</p>
  </NavLink>
))}

      </div>

      {/* User */}

      <div className="m-5 rounded-2xl bg-slate-800 p-4 flex items-center gap-4">

        <FaUserCircle className="text-cyan-400 text-5xl" />

        <div>

          <p className="text-white font-semibold">
            Admin
          </p>

          <p className="text-slate-400 text-sm">
            AI Researcher
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;