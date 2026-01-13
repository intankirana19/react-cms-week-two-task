const API_BASE = '/api';

export const PRODUCT_ROUTES = {
  BASE: `${API_BASE}/products`,
} as const;

export const API_ROUTES = {
  ROLE: PRODUCT_ROUTES,
} as const;