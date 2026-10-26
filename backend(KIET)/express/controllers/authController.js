const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const {generateTokenAccess,generateTokenRefresh} = require("../util/jwt")


const registeredUser=async(req,res)=>{
    try{
        const{username,email,password,role}=req.body
        if(!username||!email||!password)
        {
            return res.status(400).json({message:"All fields required"})
        }

        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message:"User already Exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        //creating new user
        const user= await User.create({
            username,
            email,
            password:hashedPassword,
            role
        })
     
        return res.status(201).json({
        message:"User registered successfuly",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
        })
    } catch(error){
        console.error(error)
        return res.status(500).json({message:"registration failed"})
    }

}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect =
            await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

      

        const tokenAccess = generateTokenAccess(user);
        const tokenRefresh = generateTokenRefresh(user);

        res.cookie("",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:60*60*100
        })
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Login failed"
        });
    }
};

const logout = async(req , res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({
            success : "false",
            message : "Token not found"
        })
    }

    res.clearCookies("token");

    return res.status(200).json({
        success : true ,
        message : "Logout successfully"
    })
}

module.exports={registeredUser,loginUser}