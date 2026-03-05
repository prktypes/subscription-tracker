import { Router } from "express";

const subRouter = Router();

subRouter.get('/',(req,res)=>{
    res.send("GET all the subscriptions")
})
subRouter.post('/',(req,res)=>{
    res.send("CREATE a new subscription")
})
subRouter.put('/:id',(req,res)=>{
    res.send("UPDATE subscription")
})
subRouter.put('/:id/cancel',(req,res)=>{
    res.send("CANCEL subscription")
})
subRouter.delete('/:id',(req,res)=>{
    res.send("DELETE the subscription")
})
subRouter.get('/:id',(req,res)=>{
    res.send("GET details of the subscription")
})
subRouter.get('/upcoming-renewals',(req,res)=>{
    res.send("GET upcoming renewals")
})



export default subRouter