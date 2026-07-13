import {
  FaBell,
  FaCog,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Topbar() {
  const now = new Date();

  const date = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0B1120]/70 border-b border-slate-800">

      <div className="flex items-center justify-between px-8 py-5">

        {/* Search */}

        <div className="flex items-center w-[380px] rounded-2xl bg-white/5 border border-slate-700 px-4 py-3">

          <FaSearch className="text-slate-400" />

          <input
            type="text"
            placeholder="Search reports..."
            className="ml-3 w-full bg-transparent outline-none text-white placeholder:text-slate-500"
          />

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          <p className="text-slate-400">
            {date}
          </p>

          <button className="relative rounded-xl bg-white/5 p-3 hover:bg-cyan-500/20 transition">

            <FaBell className="text-white" />

            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>

          </button>

          <button className="rounded-xl bg-white/5 p-3 hover:bg-cyan-500/20 transition">
            <FaCog className="text-white" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-2 border border-slate-700">

            <FaUserCircle className="text-4xl text-cyan-400" />

            <div>

              <p className="text-white font-semibold">
                Admin
              </p>

              <p className="text-slate-400 text-sm">
                Intelligence Officer
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Topbar;