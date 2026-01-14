import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute"
import MainLayout from "../layouts/MainLayout"

import Login from "../pages/Login"
// import Dashboard from "../pages/Dashboard"
// import Products from "../pages/Products"
// import { useAuth } from "../hooks/useAuth"
import NotFound from "../pages/NotFound"
import { lazy, Suspense, type ElementType } from "react"

const DashboardPage = lazy(() => import('../pages/Dashboard'));
const ProductPage = lazy(() => import('../pages/Products'));
const ProductFormPage = lazy(() => import('../pages/ProductForm'));

// function HomeRedirect() {
//   const { isAuthenticated } = useAuth()
//   return (
//     <Navigate to={isAuthenticated ? "/products" : "/login"} replace />
//   )
// }

function LoadingFallback() {
  return (<div className="flex justify-center mt-12">Memuat...</div>)
}

export default function AppRouter() {
  type AppRoute =
    | { index: true; Component: ElementType }
    | { path: string; Component: ElementType };

  const routes: AppRoute[] = [
    {index: true, Component: ProductPage},
    {path: '/dashboard', Component: DashboardPage},
    {path: '/products', Component: ProductPage},
    {path: '/products/new', Component: ProductFormPage},
    {path: '/products/edit/:id', Component: ProductFormPage},
  ]

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* <Route path="/" element={<HomeRedirect />} /> */}
        <Route path="/login" element={<Login />} />

        {/* <Route
            element={
                <ProtectedRoute>
                <MainLayout />
                </ProtectedRoute>
            }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/products"
                  element={<Products />}
                />
                <Route path="/products/new" element={<ProductFormPage />} />
                <Route
                    path="/products/edit/:id"
                    element={<ProductFormPage />}
                />
        </Route> */}

        <Route
            path="/"
            element={
                <ProtectedRoute>
                <MainLayout />
                </ProtectedRoute>
            }
          >
            {routes.map((r) => {
            const Component = r.Component;
              return 'index' in r ? (
              <Route key="index" index element={<Component />} />
                ) : (
                  <Route key={r.path} path={r.path} element={<Component />} />
                );
            })}

          </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
