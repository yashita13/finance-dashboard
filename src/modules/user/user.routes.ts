import { Router } from "express"
import { getUsers, updateUser } from "./user.controller"
import { authenticate, authorize } from "../../middlewares/auth.middleware"
import { asyncHandler } from "../../utils/asyncHandler"

const router = Router()

router.get("/",authenticate,authorize("ADMIN"),asyncHandler(getUsers))
router.patch("/:id",authenticate,authorize("ADMIN"),asyncHandler(updateUser))

export default router