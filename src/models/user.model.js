import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refershToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return next()

    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function
(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genarateAccessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            fullname:this.fullname,
            email:this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.genarateRefreshToken=function(){
    jwt.sign(
        {
            _id:this._id,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_SECRET
        }
    )
}

export const User=mongoose.model("User",userSchema)

