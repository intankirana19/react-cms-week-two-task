import { role } from "../../shared/constants/role";

export const userAdminMock = {
    id: '0000001',
    role:  role.admin, // sementara karna fitur admin/buyer gabung
    username: 'admin1',
    firstname: 'admin1',
    lastname: undefined,
    email: 'admin1@gmail.com',
    phoneNumber: '08818282828282',
    createdAt: '2026-01-28T10:24:51.029Z',
    modifiedAt: '2026-01-28T10:24:51.029Z', 
};

export const userBuyerMock = {
    id: '00000011',
    role:  role.buyer, // sementara karna fitur admin/buyer gabung
    username: 'buyer',
    firstname: 'buyer',
    lastname: 'pertama',
    email: 'buyer@gmail.com',
    phoneNumber: '085892393289211',
    createdAt: '2026-01-28T10:24:51.029Z',
    modifiedAt: '2026-01-28T10:24:51.029Z', 
}