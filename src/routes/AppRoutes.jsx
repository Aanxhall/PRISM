import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Reports from "../pages/Reports";
import AIInsights from "../pages/AIInsights";
import Analytics from "../pages/Analytics";
import KnowledgeGraph from "../pages/KnowledgeGraph";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/ai-insights" element={<AIInsights />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default AppRoutes;