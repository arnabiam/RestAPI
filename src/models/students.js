const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:3
    },
    
    email:{
            type:String,
            required: true,
            unique: [true,"Email id already present"],
            validator: function(value){
                if(!this.validator.isEmail(value)){
                    throw new Error("Email not VAlid")
                }
            }

        },
        phone:{
            type: Number,
            
            required:true,
            unique: true
        },
        address: {
            type: String,
            required: true
        }
    
})

//We will create a new collection

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
