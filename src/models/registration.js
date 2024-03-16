<<<<<<< HEAD
import { number } from "joi";
import mongoose from "mongoose";


const RegistrationSchema = new mongoose.Schema({
    fullName: String,
    fatherName: String,
    email: String,
    rollNo:String,
    course:String,
    batch:String,
    payment:String,
    paymentImg:String,
    status:String,
    city: String,
    cnic: String,
    phone:String,
    dateOfBirth:String,
    gender:String,
    qualification:String,
    address:String,
    imageUrl:String
},
    {timestamps:true}
)

const Register = mongoose.models.Register || mongoose.model('Register', RegistrationSchema )

=======
import { number } from "joi";
import mongoose from "mongoose";


const RegistrationSchema = new mongoose.Schema({
    fullName: String,
    fatherName: String,
    email: String,
    rollNo:String,
    course:String,
    batch:String,
    payment:String,
    status:String,
    city: String,
    cnic: String,
    phone:String,
    dateOfBirth:String,
    gender:String,
    qualification:String,
    address:String,
    imageUrl:String
},
    {timestamps:true}
)

const Register = mongoose.models.Register || mongoose.model('Register', RegistrationSchema )

>>>>>>> 6ca6e3e391264a7f96eea448841ead264b5783dd
export default Register;