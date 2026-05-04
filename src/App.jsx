// App.jsx
import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// Lazy Loading Halaman
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Login = React.lazy(() => import("./pages/auth/Login"));

export default function App() {
  const [role, setRole] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />

        {/* Auth Layout */}
        <Route element={!isLoggedIn ? <AuthLayout /> : <Navigate to="/dashboard" />}>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Route>

        {/* Main Layout - Tambahkan rute di sini supaya muncul */}
        <Route element={isLoggedIn ? <MainLayout role={role} setRole={setRole} /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard role={role} />} />
          <Route path="/orders" element={<Orders role={role} />} />
          <Route path="/customers" element={<Customers role={role} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}