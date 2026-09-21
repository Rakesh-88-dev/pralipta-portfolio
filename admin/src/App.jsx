import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Certifications from "./pages/Certifications";
import Media from "./pages/Media";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

import AdminLayout from "./layout/AdminLayout";
import { useAuth } from "./context/AuthContext";

import DashboardHeader from "./components/dashboard/DashboardHeader";
import DashboardStats from "./components/dashboard/DashboardStats";
import VisitorAnalytics from "./components/dashboard/VisitorAnalytics";
import RecentActivity from "./components/dashboard/RecentActivity";
import QuickActions from "./components/dashboard/QuickActions";
import TodoCard from "./components/dashboard/TodoCard";
import WebsitePreview from "./components/dashboard/WebsitePreview";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F8FC]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E3EAF2] border-t-[#123B68]" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function Dashboard() {
  return (
    <div className="p-5 sm:p-7 lg:p-8">
      <DashboardHeader />

      <DashboardStats />

      <VisitorAnalytics />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <RecentActivity />
        <QuickActions />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <TodoCard />
        <WebsitePreview />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="profile" element={<Profile />} />

        <Route path="education" element={<Education />} />

        <Route path="experience" element={<Experience />} />

        <Route path="projects" element={<Projects />} />

        <Route path="skills" element={<Skills />} />

        <Route
          path="certifications"
          element={<Certifications />}
        />

        <Route path="media" element={<Media />} />

        <Route path="messages" element={<Messages />} />

        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

export default App;