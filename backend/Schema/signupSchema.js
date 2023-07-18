const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type:String
    },
    lastname: {
        type:String
    },
    email: {
        type:String,
        unique:true
    },
    password: {
        type:String
    },
    cnfpassword: {
        type:String
    },
    imgProfile: {
        type:String
    }
})

const productDetails = new mongoose.Schema({
    prdName:{
        type:String
    },
    prdCat:{
        type:String
    },
    prdPrice:{
        type:String
    },
    prdDesc:{
        type:String
    },
    prdImg:{
        type:String
    },
    prdQty:{
        type:Number
    }
})



const signupDb = mongoose.model('signupuser', userSchema);
const prdDetail = mongoose.model('prdData', productDetails);
module.exports =  {signupDb, prdDetail} ;