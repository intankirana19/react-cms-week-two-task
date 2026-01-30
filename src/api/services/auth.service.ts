import { userAdminMock, userBuyerMock } from "../mocks/user"
import type { AuthInputSchemaType } from "../schemas/auth.schema"
import type { UserSchemaType } from "../schemas/user.schema"

export const authService = {
    login: async (data: AuthInputSchemaType): Promise<UserSchemaType> => {
        // const url = `${AUTH_ROUTES.BASE}` // blm ada API
        // const response = await apiClient.get<UserSchemaType[]>(url) // blm ada API
        if (data.username === 'admin1' || data.username === 'buyer') { // TODO: jelek,nanti ganti
            if (data.username === 'admin1') { 
                return userAdminMock 
            } else {
                return userBuyerMock
            }
        } else {
            throw new Error('Invalid username or password')
        } 
    },

    logout: async () => {
        // await apiClient.post(AUTH_ROUTES.LOGOUT); // blm ada api
        await new Promise((res) => setTimeout(res, 300));

        return {
            data: { success: true },
            status: 200
        };
    }
}