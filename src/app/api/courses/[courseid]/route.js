import { NextResponse } from "next/server";
import connectToDb from "../../../../database";
import Course from "../../../../models/course";


export async function PUT(request, content) {
    // if (req.method === 'GET') {
        try {
            await connectToDb();
            
            const  courseId = content.params.courseid
            const filter = {_id:courseId}
            const payload = await request.json();
            const result = await Course.findOneAndUpdate(filter,payload,{new:true})
            
            return NextResponse.json({result,success:true})
        } catch (error) {
            console.log("Error in editing a Course:", error);
            return NextResponse.json({success:false, error:error.message})
            // return res.status(500).json({ success: false, message: "Internal Server Error" });
          }
  }

export async function DELETE(request, content) {
    // if (req.method === 'GET') {
        try {
            await connectToDb();
            
            const  courseId = content.params.courseid
            const record = {_id:courseId}
            const result = await Course.deleteOne(record)
            
            return NextResponse.json({result,success:true})
        } catch (error) {
            console.log("Error in deleting this course:", error);
            return NextResponse.json({success:false})
            // return res.status(500).json({ success: false, message: "Internal Server Error" });
          }
  }