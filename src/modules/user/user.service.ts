import prisma from "../../config/db"
import { Role } from "@prisma/client"

type UpdateUserInput = {
    role?: Role
    isActive?: boolean
}

export const getAllUsersService = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true
        }
    })
}

export const updateUserService = async (
    id: string,
    data: UpdateUserInput
) => {
    return prisma.user.update({
        where: { id },
        data
    })
}