const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    githubId:{type: String, required:true}, //unique githubId
    username: String,                       //github username
    avatar: String,                         //profile img url
    email: String,                          //github email
    accessToken:String                      //need to check purpose
});
const User = mongoose.model("User",userSchema);

module.exports(User);