import { Router } from "express";
import { getUsers,getUserById } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/',authorize, getUsers)

userRouter.get('/:id',getUserById)

userRouter.post('/',(req,res)=>{
    res.send("CREATE a new user")
})
userRouter.put('/:id',(req,res)=>{
    res.send("UPDATE user detail")
})
userRouter.delete('/:id',(req,res)=>{
    res.send("DELETE the user")
})


export default userRouter;