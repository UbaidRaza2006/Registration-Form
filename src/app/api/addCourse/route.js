
// import Registe
// import Joi from "joi";
// import { NextResponse } from "next/server";
import { NextResponse } from "next/server";
import connectToDb from "../../../database";
// import Register from "../../../models/registration";
// import { NextResponse } from "next/server";

import Joi from "joi";
import Course from "../../../models/course";




const CourseSchema = Joi.object({
    course: Joi.string().required(),
    batch: Joi.number().required(),
    admission: Joi.string().required(),
})



export const dynamic = "force-dynamic"




export async function POST(req) {
    try {
        await connectToDb()

        

            const extractData = await req.json();
            const {
                course,
                batch,
                admission,
                }= extractData;


            const { error } = CourseSchema.validate({
                course,
                batch,
                admission,
            });
    
            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                });
            }
    

                     const sameCourse=await Course.findOne({course:course})

            if(sameCourse){

                return NextResponse.json({
                    success: false,
                    message: "The Course Already exists!",
                })

            }



            const courseAdded = await Course.create({
                course,
                batch,
                admission,
            });

            if(courseAdded){
                console.log(courseAdded);
                return NextResponse.json({
                    success: true,
                    course:courseAdded,
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
        console.log("Error in adding Course-->", error);

        return NextResponse.json({
            success: false,
            message: "Something went Wrong, please Try Again later!"
        })
    }
}