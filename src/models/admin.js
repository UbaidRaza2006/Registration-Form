// import { number } from "joi";
// import mongoose from "mongoose";

import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
    adminName: String,
    adminPassword: String,
    admissions:String,
    textAdmission:String,
    infoImage:String,
},
    {timestamps:true}
)

const Admin = mongoose.models.Admin|| mongoose.model('Admin', AdminSchema )

export default Admin;