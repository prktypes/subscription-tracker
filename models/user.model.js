import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'User Name is required!'],
        trim: true,
        minLength: 2
    },
    email:{
        type: String,
        required: [true,'User Email is required!'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/],
    },
    password:{
        type: String,
        required: [true,'User Password is required!'],
        minLength:8,
    }
},{timestamps: true})

//User is the model here
const User = mongoose.model('User',userSchema)

export default User;