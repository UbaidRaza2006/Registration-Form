
// import Register from "@/models/registration";
import { data } from "autoprefixer";
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';

// import Joi from "joi";
import { connect } from "mongoose";
import connectToDb from "../../../database";
import Admin from "../../../models/admin";
import { NextResponse } from "next/server";
import Joi from "joi";
// import { NextResponse } from "next/server";
// import connectToDb from "../../../database";
// import Register from "../../../models/registration";
// import { NextResponse } from "next/server";




const AdminSchema = Joi.object({
    adminName: Joi.string().required(),
    adminPassword: Joi.string().required(),
    admissions: Joi.string().required(),
    textAdmission: Joi.string().allow(''),
    infoImage: Joi.string().allow(''),
})



export const dynamic = "force-dynamic"




export async function POST(req) {
    try {
        await connectToDb();

        

            const extractData = await req.json();
            const {
                 adminName,
                adminPassword,
                admissions,
                textAdmission,
                infoImage,
                }= extractData;


            const { error } = AdminSchema.validate({
                adminName,
                adminPassword,
                admissions,
                textAdmission,
                infoImage,
            });
    
            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                });
            }
    
            const adminCreated = await Admin.create({
                adminName,
                adminPassword,
                admissions,
                textAdmission,
                infoImage,
            });

            if(adminCreated){
                console.log(adminCreated);
                return NextResponse.json({
                    success: true,
                    admin:adminCreated,
                    message: "Created Successfully!",
                })
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Failed to create. Plz try again! ",
                })
            }




        



    } catch (error) {
        // if (error.code === 11000) {
        //     // Duplicate key error, handle it
        //     return NextResponse.json({
        //         success: false,
        //         message: "A user with the same CNIC already exists.",
        //     });
        // }
        console.log("Error in creating admin-->", error);

        return NextResponse.json({
            success: false,
            message: "Something went Wrong, please Try Again later!"
        })
    }
}