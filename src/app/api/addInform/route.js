
// import Registe
// import Joi from "joi";
// import { NextResponse } from "next/server";
// import { NextResponse } from "next/server";
// import connectToDb from "../../../database";
// // import Register from "../../../models/registration";
// // import { NextResponse } from "next/server";

import Joi from "joi";
import connectToDb from "../../../database";
import { NextResponse } from "next/server";
import Inform from "../../../models/inform";

// import Joi from "joi";
// import Course from "../../../models/course";




const InformSchema = Joi.object({
    contact: Joi.string().required(),
})



export const dynamic = "force-dynamic"




export async function POST(req) {
    try {
        await connectToDb();

        

            const extractData = await req.json();
            const {
                contact,
                }= extractData;


            const { error } = InformSchema.validate({
                contact,
            });
    
            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                });
            }
    

                     const sameContact=await Inform.findOne({contact:contact})

            if(sameContact){

                return NextResponse.json({
                    success: true,
                    message: "Already Exists!",
                })

            }



            const contactAdded = await Inform.create({
                contact,
            });

            if(contactAdded){
                console.log(contactAdded);
                return NextResponse.json({
                    success: true,
                    contact:contactAdded,
                    message: "Added Successfully!",
                })
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Failed to submit, Plz try again! ",
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
        console.log("Error in submitting-->", error);

        return NextResponse.json({
            success: false,
            message: "Something went Wrong, please Try Again later!"
        })
    }
}