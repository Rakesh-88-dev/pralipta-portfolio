import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F8FC] text-[#172033]">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        {mobileSidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-[#172033]/30 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />

            <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <Sidebar />
            </div>
          </>
        )}

        {/* Main */}
        <div className="min-w-0 flex-1">
          <Header
            onMenuClick={() => setMobileSidebarOpen(true)}
          />

          <main className="min-h-[calc(100vh-76px)]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}