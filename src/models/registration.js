import { number } from "joi";
import mongoose from "mongoose";


const RegistrationSchema = new mongoose.Schema({
    fullName: String,
    fatherName: String,
    email: String,
    rollNo: {
        type: String,
        unique: true
    },
    course: String,
    batch: Number,
    payment: String,
    paymentImg: String,
    status: String,
    otherStatus: String,
    city: String,
    cnic: String,
    phone: String,
    dateOfBirth: String,
    gender: String,
    qualification: String,
    address: String,
    imageUrl: String
},
{ timestamps: true }
)

const Register = mongoose.models.Register || mongoose.model('Register', RegistrationSchema)
export default Register;