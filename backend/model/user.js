const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userShcema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
});
userShcema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10);
    }
    next();
})
module.exports = mongoose.model('User',userShcema);