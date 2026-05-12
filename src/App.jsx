import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// Lazy Loading Halaman - Pastikan nama file sesuai (Case Sensitive)
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products")); // Rute List Products
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage")); // Komponen Error
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  const [role, setRole] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Redirect Awal */}
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />

        {/* Auth Layout Group */}
        <Route element={!isLoggedIn ? <AuthLayout /> : <Navigate to="/dashboard" />}>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Main Layout Group (Sidebar BerryLaundry muncul di sini) */}
        <Route element={isLoggedIn ? <MainLayout role={role} setRole={setRole} /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard role={role} />} />
          <Route path="/orders" element={<Orders role={role} />} />
          <Route path="/customers" element={<Customers role={role} />} />
          
          {/* ✅ Rute Baru Agar Menu Sidebar Berfungsi */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* ✅ Rute Error Pages (Supaya tetap ada Sidebar) */}
          <Route 
            path="/error-400" 
            element={<ErrorPage errorCode="400" title="Bad Request" />} 
          />
          <Route 
            path="/error-401" 
            element={<ErrorPage errorCode="401" title="Unauthorized" />} 
          />
          <Route 
            path="/error-403" 
            element={<ErrorPage errorCode="403" title="Forbidden" />} 
          />
        </Route>

        {/* Jika rute ngawur, lempar ke home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}