import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute"
import MainLayout from "../layouts/MainLayout"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Products from "../pages/Products"
import ProductFormPage from "../pages/ProductFormPage"
import { useAuth } from "../hooks/useAuth"
import NotFound from "../pages/NotFound"

function HomeRedirect() {
  const { isAuthenticated } = useAuth()
  return (
    <Navigate to={isAuthenticated ? "/products" : "/login"} replace />
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<Login />} />

        <Route
            element={
                <ProtectedRoute>
                <MainLayout />
                </ProtectedRoute>
            }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/new" element={<ProductFormPage />} />
                <Route
                    path="/products/:id/edit"
                    element={<ProductFormPage />}
                />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
