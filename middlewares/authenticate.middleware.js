import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';

const Authenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        console.log(token);
        const decoded = await jwt.decode(token,process.env.JWT_SECRET);
        console.log(decoded.id);
        const user = await User.findById(decoded.id);
        console.log(user);
        if(user){
            req.user = user;
            next();
        }else{
            res.status(404);
            throw new Error("User Not found");
        }
    } catch (error) {
        res.status(400);
        throw new Error("Not authenticated");
    }
}

const AuthorizeAdmin = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        console.log(token);
        const decoded = await jwt.decode(token,process.env.JWT_SECRET);
        console.log(decoded);
        const admin = await Admin.findById(decoded.id);
        console.log(admin);
        if(admin){
            req.user = admin;
            next();
        }else{
            res.status(404);
            throw new Error("admin Not found");
        }
    } catch (error) {
        res.status(400);
        throw new Error("You are not a admin");
    }
}

export {Authenticate,AuthorizeAdmin};