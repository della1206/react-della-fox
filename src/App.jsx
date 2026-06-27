import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";

// Lazy imports
const Guest = React.lazy(() => import("./pages/Guest"));
const OrderPage = React.lazy(() => import("./pages/OrderPage"));
const MainLayout = React.lazy(() => import("./Layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./Layouts/AuthLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Products = React.lazy(() => import("./pages/Products")); 
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage")); 
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Components = React.lazy(() => import("./pages/Components"));
const FiturCrm = React.lazy(() => import("./pages/FiturCrm"));
const AdminUser = React.lazy(() => import("./pages/AdminUser"));
const MemberPackage = React.lazy(() => import("./pages/MemberPackage"));
const LoginMember = React.lazy(() => import("./pages/LoginMember"));
const RegisterMember = React.lazy(() => import("./pages/RegisterMember"));
const MemberConfirmation = React.lazy(() => import("./pages/MemberConfirmation"));
// Import AdminReview
const AdminReview = React.lazy(() => import("./pages/AdminReview")); // Sesuaikan path dengan lokasi file Anda

export default function App() {
  const [role, setRole] = useState("Admin"); 
  const location = useLocation();
  
  // State untuk member login (pisah dengan admin)
  const [isMemberLoggedIn, setIsMemberLoggedIn] = useState(() => {
    return localStorage.getItem("isMemberLoggedIn") === "true";
  });
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });

  const showNavbar = location.pathname === "/" || location.pathname === "/pesan";

  return (
    <Suspense fallback={<Loading />}>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Halaman utama publik */}
        <Route path="/" element={<Guest />} />
        <Route path="/pesan" element={<OrderPage />} />

        {/* ==================== HALAMAN MEMBER (TANPA PROTEKSI ADMIN) ==================== */}
        <Route path="/login-member" element={<LoginMember setIsLoggedIn={setIsMemberLoggedIn} />} />
        <Route path="/register-member" element={<RegisterMember />} />
        <Route path="/member-package" element={<MemberPackage />} />
        <Route path="/member-confirmation" element={<MemberConfirmation />} />

        {/* ==================== HALAMAN ADMIN ==================== */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login setIsLoggedIn={setIsAdminLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Proteksi halaman internal dashboard admin (HANYA UNTUK ADMIN) */}
        <Route element={isAdminLoggedIn ? <MainLayout role={role} setRole={setRole} /> : <Navigate to="/login" replace />}>
          <Route path="/dashboard" element={<Dashboard role={role} />} />
          <Route path="/orders" element={<Orders role={role} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/components" element={<Components />} />
          <Route path="/pelanggan" element={<FiturCrm />} />
          <Route path="/admin-user" element={<AdminUser />} />
          <Route path="/admin-review" element={<AdminReview />} /> {/* Route untuk AdminReview */}

          <Route path="/error-400" element={<ErrorPage errorCode="400" title="Bad Request" />} />
          <Route path="/error-401" element={<ErrorPage errorCode="401" title="Unauthorized" />} />
          <Route path="/error-403" element={<ErrorPage errorCode="403" title="Forbidden" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}