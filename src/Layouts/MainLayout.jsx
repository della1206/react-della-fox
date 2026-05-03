import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({ role, setRole }) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar role={role} />
      <div className="flex-1">
        <Header role={role} setRole={setRole} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}