// change folder structure based on khatulistiwa-fe-core repo & https://medium.com/@tejasvinavale1599/the-best-folder-structure-for-scalable-react-apps-in-2025-enterprise-recommended-4fa755b8f0c7

import { QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { queryClient } from "../shared/lib/queryClient";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import type { ErrorInfo } from "react";

function ErrorFallback({ error, resetErrorBoundary }: Readonly<FallbackProps>) {
  return (
    <div role="alert" className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white flex flex-col items-center justify-center p-6 rounded shadow min-w-[20rem] w-auto space-y-4">
        <h1 className="text-5xl font-bold text-center text-[#7B1E3A]">
          Error
        </h1>
        <p className="text-xl text-center">
          {error.message}
        </p>
        <button
          className="bg-[#7B1E3A] text-white text-center w-full p-2 rounded hover:bg-[#9B2C4A] cursor-pointer" 
          onClick={resetErrorBoundary}>
            Ulang
        </button>
      </div>
    </div>
  );
}

function logErrorToService(error: Error, info: ErrorInfo) {
  console.error("Logging error:", error, info);
}

export function App() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={ErrorFallback}
          onError={logErrorToService}
        >
              <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                  <AppRouter />
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
