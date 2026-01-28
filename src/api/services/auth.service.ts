import { userAdminMock, userBuyerMock } from "../mocks/user"
import type { AuthInputSchemaType } from "../schemas/auth.schema"
import type { UserSchemaType } from "../schemas/user.schema"

export const productService = {
    login: async (data: AuthInputSchemaType): Promise<UserSchemaType> => {
        // const url = `${AUTH_ROUTES.BASE}` // blm ada API
        // const response = await apiClient.get<UserSchemaType[]>(url) // blm ada API
        const response = data.username === 'admin1' ? userAdminMock : userBuyerMock
        return response
    }
}