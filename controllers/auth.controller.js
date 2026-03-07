//this file will contain all the logic for authentication
// and authorization which will be used in the auth routes

//what is a req body -> req.body is an object containing data sent by client (POST request)
import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signUp = async (req,res,next) => {
//Ensure that all actions are atomic in nature.

//1. Adding a new user to the database
    const session = await mongoose.startSession(); //but why mongoose.startSession() -> it creates a new session for the current operation, allowing us to perform multiple database operations as a single unit of work. If any operation within the transaction fails, we can roll back all changes made during that transaction, ensuring data integrity and consistency.

    try{
        const { name, email, password } = req.body;
        //2. Check if user already exists
        const existingUser = await User.findOne({email})

        if(existingUser){
            const error = new Error('User already exists with this email!');
            error.statusCode = 409;
            throw error;
        }
        //Hash the password for user security before saving to database
        const hashedPassword = await bcrypt.hash(password,salt)
        
        //Create a new user instance with the provided data and hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        }, {session})





        const salt = await bcrypt.genSalt(10);

        await session.commitTransaction();
    }catch(error){
        await session.abortTransaction();
    }


}

export const signIn = (req,res,next) => {}

export const signOut = (req,res,next) => {}