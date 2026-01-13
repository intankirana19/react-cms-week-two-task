export const queryKeys = {
    products: {
        all: ['products'] as const,
        lists: () => [...queryKeys.products.all, 'list'] as const, // sementara, api hanya kasi array produk2 blm ada data utk pagination
        // list: (params: PaginationParams) => [...queryKeys.products.lists(), params] as const,
        // details: () => [...queryKeys.products.all, 'detail'] as const,
        // detail: (id: string) => [...queryKeys.products.details(), id] as const,
    },
}