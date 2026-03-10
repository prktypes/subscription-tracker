//this controller will be the logic for the subscription route
import { get } from "mongoose";
import Subscription from "../models/subscription.model.js";


export const createSubscription = async (req, res, next) => {
    try{
        if(!req.user){
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        const subscription = await Subscription.create({
            ...req.body, // Spread the request body to get all subscription details
            user: req.user._id // Associate the subscription with the authenticated user
        });
        res.status(201).json({
            success: true,
            message: "Subscription created successfully!",
            data: subscription
        })

    }catch(error){
        // forward to the express error handler instead of throwing (which crashes the process)
        next(error);
    }
}
export const getSubscriptions = async (req,res,next) => {
    try{
        //first check if the user is authenticated i,e the same user is trying to access their own subscription details
        if(!req.user){
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }
        const subscriptions = await Subscription.find({user: req.user._id}); //fetch all subscriptions for the authenticated user
        res.status(200).json({
            success: true,
            data: subscriptions
        })

    }catch(error){
        next(error);
    }
}

export const getSubscriptionById = async (req,res,next) => {
    try{

        const subscription = await Subscription.findById(req.params.id)
        if(!subscription){
            res.status(404).json({
                success: false,
                message: "Subscription not found!"
            })
        }
        res.status(200).json({
            success: true,
            data: subscription
        })

    }catch(error){
        next(error);
    }
}

export const updateSubscription = async (req,res,next) => {
    try{
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {new: true}) //
        if(!subscription){
            res.status(404).json({
                success: false,
                message: "Subscription not found!"
            })
        }
        res.status(200).json({
            success: true,
            data: subscription
        })
    }catch(error){
        next(error);
    }
}

export const cancelSubscription = async (req,res,next) => {
    try{
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, {status: 'cancelled'}, {new: true})
        if(!subscription){
            res.status(404).json({
                success: false, 
                message: "Subscription not found!"
            })
        }
        res.status(200).json({
            success: true,
            data: subscription
        })
    }catch(error){
        next(error);
    }
}