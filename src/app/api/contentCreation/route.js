
// import Register from "@/models/registration";
// import { data } from "autoprefixer";
// // const { v4: uuidv4 } = require('uuid');
// import { v4 as uuidv4 } from 'uuid';

// import { connect } from "mongoose";
import Joi from "joi";
import connectToDb from "../../../database";
import { NextResponse } from "next/server";
import Content from "../../../models/content";

// import Joi from "joi";

// import connectToDb from "../../../database";
// import Admin from "../../../models/admin";
// import { NextResponse } from "next/server";
// import Joi from "joi";

// import { NextResponse } from "next/server";
// import connectToDb from "../../../database";
// import Register from "../../../models/registration";
// import { NextResponse } from "next/server";

Content.syncIndexes();



const ContentSchema = Joi.object({
    contentImage: Joi.string(),
})



export const dynamic = "force-dynamic"




export async function POST(req) {
    try {
        await connectToDb();

        

            const extractData = await req.json();
            const {
                contentImage,
                }= extractData;


            const { error } = ContentSchema.validate({
                contentImage,
            });
    
            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                });
            }
    
            const contentCreated = await Content.create({
                contentImage,
            });

            if(contentCreated){
                console.log(contentCreated);
                return NextResponse.json({
                    success: true,
                    content:contentCreated,
                    message: "Image for ID Card Added Successfully!",
                })
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Failed to upload. Plz try again! ",
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
        console.log("Error in adding Image-->", error);

        return NextResponse.json({
            success: false,
            message: "Something went Wrong, please Try Again later!"
        })
    }
}