// change folder structure based on khatulistiwa-fe-core repo & https://medium.com/@tejasvinavale1599/the-best-folder-structure-for-scalable-react-apps-in-2025-enterprise-recommended-4fa755b8f0c7

import { QueryErrorResetBoundary } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { queryClient } from "../shared/lib/queryClient"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"
import { useEffect, type ErrorInfo } from "react"
import { Button } from "../shared/components/Button"
import { ToastContainer } from "../shared/components/Toast"
import { useToast } from "../shared/hooks/useToast"
import { useAuthStore } from "../features/auth/stores/auth.store"
import { role } from "../shared/constants/role"

// sementara utk persist query? ( updated product list karna add/edit product msh mock)
const persister = createAsyncStoragePersister({
  storage: window.localStorage,
})

function ErrorFallback({ error, resetErrorBoundary }: Readonly<FallbackProps>) {
  return (
    <div role="alert" className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white flex flex-col items-center justify-center p-6 rounded shadow min-w-[20rem] w-auto space-y-4">
        <h1 className="text-5xl font-bold text-center text-primary-200">
          Error
        </h1>
        <p className="text-xl text-center">
          {error.message}
        </p>
        <Button variant="primary" className="w-full" onClick={resetErrorBoundary}>Ulang</Button>
      </div>
    </div>
  )
}

function logErrorToService(error: Error, info: ErrorInfo) {
  console.error("Logging error:", error, info)
}

export function App() {
  const {user} = useAuthStore();
  const {toasts} = useToast()

  useEffect(() => {
    document.title = `${user?.role === role.admin ? 'Admin ' : ''}Toko Intan`;
  }, [user]);
  
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={ErrorFallback}
          onError={logErrorToService}
        >
          <PersistQueryClientProvider // sementara utk persist query? ( updated product list karna add/edit product msh mock)
            client={queryClient}
            persistOptions={{ persister }}
          >
            <BrowserRouter>
              <ToastContainer toasts={toasts} />
              <AppRouter />
            </BrowserRouter>

            <ReactQueryDevtools initialIsOpen={false} />
          </PersistQueryClientProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
