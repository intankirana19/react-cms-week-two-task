// import { PRODUCT_API } from "../../constants/constants";
import { apiClient } from "../../shared/lib/axios";
import { PRODUCT_ROUTES } from "../constants/routes";
import type { ProductSchemaType } from "../schemas/product.schema";

export const productService = {
    getList: async (): Promise<ProductSchemaType[]> => {
        const url = `${PRODUCT_ROUTES.BASE}` // blm ada qparam
        const response = await apiClient.get<ProductSchemaType[]>(url)
        return response.data
    }
}