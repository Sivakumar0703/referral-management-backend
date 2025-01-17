// for authenticating the user 

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secretKey = process.env.JWT_SECRET_KEY;

const authenticate = async(req,res,next) => {
    try {
        if(req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer") &&
            req.headers.authorization.split(" ")[1]
        ){
            const token = req.headers.authorization.split(" ")[1];
            const decodeToken = jwt.verify(token, secretKey);
            req.user = await User.findById(decodeToken.id);
            next();
        } else {
           res.status(401).json({message:"token verification failed"}); 
        }
    } catch (error) {
        console.log("error in authenticating the user", error);
        res.status(500).json({message:"internal server error"});
    }
}

export default authenticate