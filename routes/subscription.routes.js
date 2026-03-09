import { Router } from "express";
import authorise from "../middlewares/auth.middleware.js";
import { createSubscription } from "../controllers/subscription.controller.js";
const subRouter = Router();

subRouter.get('/',(req,res)=>{
    res.send("GET all the subscriptions")
})
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
subRouter.get('/:id',(req,res)=>{
    res.send("GET details of the subscription")
})
subRouter.get('/upcoming-renewals',(req,res)=>{
    res.send("GET upcoming renewals")
})



export default subRouter