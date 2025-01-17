import User from "../models/user.model.js";
import { compareWithHashedPassword, generateToken, hashPassword } from "../utils/encryptDecrypt.js";
import { validateEmail } from "../utils/validation.js";


// register a user
export const registerUser = async(req,res) => {
    const {name, email, password} = req.body;
    try {
        // check the email and password data is available
        if(!email || !password || !name){
            return res.status(400).json({message:"email, password and name are required"});
        }
        // validate email
        const validateMail = validateEmail(email);
        if(!validateMail){
            return res.status(400).json({message:"invalid email"});  
        }
        // check if the email is already exists
        const isEmailExists = await User.findOne({email});
        if(isEmailExists){
            return res.status(409).json({message:"user already exists"});
        }
        // hash user passowrd
        const hashedPassword = await hashPassword(password);
        req.body.password = hashedPassword;
        // register the user if the email is unique
        await User.create(req.body);
        res.status(201).json({message:"user registered successfully"});
    } catch (error) {
        console.log("error in user registeration", error);
        res.status(500).json({message:"internal server error"});
    }
}


// login user
export const loginUser = async(req,res) => {
    const {email, password} = req.body;
    try {
        // check for email and password
        if(!email || !password){
            return res.status(400).json({message:"email and password are required"}); 
        }
        // check for user
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        // verify login
        const isPasswordMatched = await compareWithHashedPassword(password, user.password);
        if(!isPasswordMatched){
            return res.status(401).json({message:"invalid password"});  
        }
        // generate token for user and save it in db
        const userId = user._id;
        const token = await generateToken({id:userId});
        console.log('token',token);
        user.token = token;
        await user.save();
        res.status(200).json({message:"login successful", token});
    } catch (error) {
        console.log("error in user login", error);
        res.status(500).json({message:"internal server error"}); 
    }
}

// logout the user
export const logoutUser = async(req,res) => {
    const id = req.user?._id;
    try {
        // check for user id
        if(!id){
            return res.status(404).json({message:"user id not found"});    
        }
        // find user from db
       const user = await User.findById(id);
       if(!user){
        return res.status(404).json({message:"user not found"});
       }
       // deleting token from db
       await User.findByIdAndUpdate({_id:user._id}, {$unset:{"token":""}}) 
       res.status(200).json({message:"user logged out successfully"})
    } catch (error) {
        console.log("error in logging out", error);
        res.status(500).json({message:"internal server error"});
    }
}