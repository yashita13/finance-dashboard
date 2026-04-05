import { Request, Response } from "express"
import { getAllUsersService, updateUserService } from "./user.service"

export const getUsers = async (req: Request, res: Response) => {
    const users = await getAllUsersService()
    res.status(200).json({ success: true, data: users })
}

export const updateUser=async(req:Request,res:Response)=>{
    const id=req.params.id

    if(!id||Array.isArray(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid User ID"
        })
    }

    const {role,isActive}=req.body

    if(role===undefined&&isActive===undefined){
        return res.status(400).json({
            success:false,
            message:"Nothing to update"
        })
    }

    const user=await updateUserService(id,{role,isActive})

    res.status(200).json({success:true,data:user})
}