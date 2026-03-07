//routes are the endpoints of our application where the client 
//interacts with the server and controllers are the functions that
// handle the logic for each route

import { Router } from "express";
import {signUp, signIn, signOut} from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)
authRouter.post('/sign-out',signOut)

export default authRouter