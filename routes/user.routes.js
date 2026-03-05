import { Router } from "express";

const userRouter = Router();

userRouter.get('/',(req,res)=>{
    res.send("GET all the users")
})
userRouter.post('/',(req,res)=>{
    res.send("CREATE a new user")
})
userRouter.put('/:id',(req,res)=>{
    res.send("UPDATE user detail")
})
userRouter.delete('/:id',(req,res)=>{
    res.send("DELETE the user")
})
userRouter.get('/:id',(req,res)=>{
    res.send("GET details of the user")
})

export default userRouter;