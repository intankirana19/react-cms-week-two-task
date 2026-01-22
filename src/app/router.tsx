import { Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import NotFound from "../shared/pages/NotFound"
import { lazy, Suspense, type ElementType } from "react"
import Login from "../features/auth/pages/Login";
import ProtectedRoute from "./ProtectedRoute";

const DashboardPage = lazy(() => import('../features/dashboard/pages/Dashboard'));
const ProductPage = lazy(() => import('../features/product/pages/Products'));
const ProductFormPage = lazy(() => import('../features/product/pages/ProductForm'));
const CheckoutPage = lazy(() => import('../features/cart/pages/Checkout'));

// function HomeRedirect() {
//   const { isAuthenticated } = useAuth()
//   return (
//     <Navigate to={isAuthenticated ? "/products" : "/login"} replace />
//   )
// }

function LoadingFallback() {
  return (<div className="flex justify-center mt-12 text-5xl font-bold">Memuat...</div>)
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
    {path: '/checkout', Component: CheckoutPage},
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
