import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0F172A]">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        {children}

      </div>

    </div>
  );
}

export default MainLayout;