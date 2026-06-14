import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // <-- Ditambahkan useLocation
import Loading from "./components/Loading";
import Navbar from "./components/Navbar"; // <-- Ditambahkan impor Navbar Komponen Global

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

export default function App() {
  const [role, setRole] = useState("Admin"); 
  const location = useLocation(); // <-- Ditambahkan untuk melacak posisi halaman aktif
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Kondisi: Navbar hanya akan ikut muncul di halaman publik luar saja (Halaman Guest & Formulir Order)
  const showNavbar = location.pathname === "/" || location.pathname === "/pesan";

  return (
    <Suspense fallback={<Loading />}>
      {/* Jika showNavbar cocok, komponen menu navigasi akan selalu ikut nempel di atas */}
      {showNavbar && <Navbar />}

      <Routes>
        {/* Halaman utama publik */}
        <Route path="/" element={<Guest />} />
        <Route path="/pesan" element={<OrderPage />} />

        {/* Halaman Auth - Bebas hambatan, tidak mental sebelum login */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Proteksi halaman internal dashboard admin */}
        <Route element={isLoggedIn ? <MainLayout role={role} setRole={setRole} /> : <Navigate to="/login" replace />}>
          <Route path="/dashboard" element={<Dashboard role={role} />} />
          <Route path="/orders" element={<Orders role={role} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/components" element={<Components />} />
          <Route path="/pelanggan" element={<FiturCrm />} />
          <Route path="/admin-user" element={<AdminUser />} />  

          <Route path="/error-400" element={<ErrorPage errorCode="400" title="Bad Request" />} />
          <Route path="/error-401" element={<ErrorPage errorCode="401" title="Unauthorized" />} />
          <Route path="/error-403" element={<ErrorPage errorCode="403" title="Forbidden" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}