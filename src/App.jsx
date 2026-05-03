import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import './assets/scss/style.scss';

// Lazy Loading Pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Orders = React.lazy(() => import("./pages/Orders")); 
const Customers = React.lazy(() => import("./pages/Customers"));

export default function App() {
  const [role, setRole] = useState("Guest");

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Main Layout dengan Role Switcher */}
        <Route element={<MainLayout role={role} setRole={setRole} />}>
          <Route path="/dashboard" element={<Dashboard role={role} />} />
          <Route path="/orders" element={<Orders role={role} />} />
          <Route path="/customers" element={<Customers role={role} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

