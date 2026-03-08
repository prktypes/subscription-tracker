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

        if (!name || !email || !password) {
            const err = new Error('Name, email and password are required');
            err.statusCode = 400;
            throw err;
        }

        // start a transaction explicitly
        session.startTransaction();

        //2. Check if user already exists (use the session)
        const existingUser = await User.findOne({ email }).session(session);

        if(existingUser){
            const error = new Error('User already exists with this email!');
            error.statusCode = 409;
            throw error;
        }

        //Hash the password for user security before saving to database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create and save the user using the transaction session
        const [createdUser] = await User.create([
            { name, email, password: hashedPassword }
        ], { session });

        //create JWT token
        const token = jwt.sign({ userId: createdUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // commit and end
        await session.commitTransaction();

        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            data: {
                token,
                user: createdUser
            }
        });
    }catch(error){
        // abort only if a transaction is active; swallow abort errors
        try{
            await session.abortTransaction();
        }catch(_){
            // if abort fails (e.g., no active transaction), ignore to avoid masking original error
        }

        // forward error to error middleware
        return next(error);
    }finally{
        session.endSession();
    }


}

export const signIn = async (req,res,next) => {

    try{
        //destructure email and password from req.body
        const {email,password} = req.body;

        //check if user exists
        const user = await User.findOne({email});

        if(!user){
            const error = new Error('User not found!')
            error.statusCode = 404;
            throw error;
        }
        //compare password with hashed password in database
        const isValidPassword = await bcrypt.compare(password,user.password); //bcrpt function hases the user entered password and compares it with the hashed password stored in the database. It returns true if they match, otherwise false.
        
        if(!isValidPassword){
            const error = new Error('Invalid password!');
            error.statusCode = 401;
            throw error;
        }
        //create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            success: true,
            message: 'User signed in successfully!',
            data:{
                token,
                user,
            }
        })
    }catch(error){
        next(error);
    }

}

export const signOut = (req,res,next) => {}