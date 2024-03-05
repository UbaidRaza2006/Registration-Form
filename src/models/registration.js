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

export default Register;