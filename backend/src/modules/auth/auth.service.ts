import prisma from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if(existingUser){
        const error=new Error("User already exists")
        ;(error as any).status=400
        throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "VIEWER",
        },
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if(!user){
        const error=new Error("Invalid credentials")
        ;(error as any).status=401
        throw error
    }
    if(!user.isActive){
        const error=new Error("User is inactive")
        ;(error as any).status=403
        throw error
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        const error=new Error("Invalid credentials")
        ;(error as any).status=401
        throw error
    }

    const token = jwt.sign({
        userId:user.id,
        role:user.role,
        isActive:user.isActive
    },JWT_SECRET,{expiresIn:"1d"})

    return { token };
};