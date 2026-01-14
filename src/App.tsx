import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import type { ErrorInfo } from "react";

function logErrorToService(error: Error, info: ErrorInfo) {
  console.error("Logging error:", error, info);
}

export function App() {
  return (
    <ErrorBoundary 
        fallbackRender={({ error, resetErrorBoundary }) => (
            <div role="alert">
              <p>Eror: {error.message}</p>
              <button onClick={resetErrorBoundary}>Ulang</button>
            </div>
          )} 
        onError={logErrorToService}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
