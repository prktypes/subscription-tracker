import { Router } from "express";
import authorise from "../middlewares/auth.middleware.js";
import { createSubscription,getSubscriptions,getSubscriptionById } from "../controllers/subscription.controller.js";
const subRouter = Router();

subRouter.get('/', authorise, getSubscriptions)
subRouter.post('/', authorise, createSubscription)
subRouter.put('/:id',(req,res)=>{
    res.send("UPDATE subscription")
})
subRouter.put('/:id/cancel',(req,res)=>{
    res.send("CANCEL subscription")
})
subRouter.delete('/:id',(req,res)=>{
    res.send("DELETE the subscription")
})
subRouter.get('/:id', authorise, getSubscriptionById)
subRouter.get('/upcoming-renewals',(req,res)=>{
    res.send("GET upcoming renewals")
})



export default subRouter