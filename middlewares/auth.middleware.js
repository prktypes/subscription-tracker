// this middleware is going to ensure that only authenticated users can access
// certain routes. It will check for the presence of a valid JWT token 
// in the request headers and verify it before allowing access to the protected route.
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
//someone is making a request get user details -> authorize middleware -> check if the request has a valid token -> if valid, allow access to the route handler; if not, return an error response
//this ensures the privacy of the user, and ensures only authenticated users can access their own data or perform actions that require authentication.

const authorize = async(req, res, next) => {
    try{
        let token

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]; // Extract the token from the "Bearer <token>" format
            
            if(!token){
                throw new Error('Token not found');
            }
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.userId)
            if(!user){
                throw new Error('User not found!');
            }
            req.user = user; // Attach the user object to the request for use in subsequent middleware or route handlers
            next(); // Proceed to the next middleware or route handler
        }


    }catch(error){
        res.status(401).json({
            success: false,
            message: 'Unauthorized access!',
            error: error.message
        })
        next(error);
    }
}

export default authorize;