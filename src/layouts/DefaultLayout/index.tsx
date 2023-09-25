import { Outlet } from "react-router-dom";
import { Sidebar } from "@components/Sidebar";

export function DefaultLayout() {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-app antialiased">
      <Sidebar />
      <main className="px-4 pb-12 pt-24 lg:col-start-2 lg:px-12 lg:pb-12 lg:pt-8">
        <Outlet />
      </main>
    </div>
  );
}
