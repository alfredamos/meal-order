import { Role } from "@prisma/client"

const authenticated = ['Admin', 'Staff', 'User']


export const isAuthenticated = (role: Role) => authenticated.includes(role)
