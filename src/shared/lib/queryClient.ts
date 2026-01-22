import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // biar tidak refetch terus? sementara utk persist query? ( updated product list karna add/edit product msh mock)
    },
  },
})
