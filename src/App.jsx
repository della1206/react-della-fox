import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// Lazy Loading - Pastikan nama file di folder 'pages' sama persis (Besar/Kecil)
const MainLayout = React.lazy(() => import("./Layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./Layouts/AuthLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products")); 
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage")); 
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Components = React.lazy(() => import("./pages/Components"));
const FiturCrm = React.lazy(() => import("./pages/FiturCrm"));

export default function App() {
  const [role, setRole] = useState("Admin"); 
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Jalur masuk utama */}
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
        />

        {/* Grup rute untuk yang belum login */}
        <Route element={!isLoggedIn ? <AuthLayout /> : <Navigate to="/dashboard" replace />}>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Grup rute utama (Berisi Sidebar) */}
        <Route element={isLoggedIn ? <MainLayout role={role} setRole={setRole} /> : <Navigate to="/login" replace />}>
          <Route path="/dashboard" element={<Dashboard role={role} />} />
          <Route path="/orders" element={<Orders role={role} />} />
          <Route path="/customers" element={<Customers role={role} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/components" element={<Components />} />
          <Route path="/fitur-crm" element={<FiturCrm />} />

          <Route path="/error-400" element={<ErrorPage errorCode="400" title="Bad Request" />} />
          <Route path="/error-401" element={<ErrorPage errorCode="401" title="Unauthorized" />} />
          <Route path="/error-403" element={<ErrorPage errorCode="403" title="Forbidden" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}