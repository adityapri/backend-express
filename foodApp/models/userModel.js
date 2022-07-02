// mongodb
const mongoose = require('mongoose')
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')


const db_link = 'mongodb+srv://aditya:aditya@cluster0.zb9tbww.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
   console.log('db connected');
}).catch(function(err){
   console.log(err);
})

// userSchema
const userSchema =  mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength: 8,
        validate: function(){
            return this.confirmPassword == this.password;
        }
    }
})
userSchema.pre('save',function(){
    this.confirmPassword=undefined
})

// userSchema.pre('save',async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password,salt);
// })

// model
const userModel = mongoose.model('userModel',userSchema)

module.exports=userModel;