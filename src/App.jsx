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
// Tambahkan import ini:
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  const [role, setRole] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Halaman Utama - Redirect ke Login atau Dashboard */}
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />

        {/* Auth Layout Group */}
        <Route element={!isLoggedIn ? <AuthLayout /> : <Navigate to="/dashboard" />}>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          {/* DAFTARKAN RUTE DI SINI SUPAYA MUNCUL */}
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Main Layout Group */}
        <Route element={isLoggedIn ? <MainLayout role={role} setRole={setRole} /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard role={role} />} />
          <Route path="/orders" element={<Orders role={role} />} />
          <Route path="/customers" element={<Customers role={role} />} />
        </Route>

        {/* Tangkap Route yang Salah (404) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}