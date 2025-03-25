import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    role :{
        type : String,
        required : true,
        default : "user"
    },
    password :{
        type :String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        default : "Not given"
    },
    isDisabled : {
        type : Boolean,
        required : true,
        default : false
    },
    isVerified : {
        type : Boolean,
        required : true,
        default : false
    },
})

const User = new mongoose.model("users", userScheme);  // collection in database , that name - users

export default User;