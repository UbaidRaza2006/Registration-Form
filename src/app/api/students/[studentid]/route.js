import { NextResponse } from "next/server";
import connectToDb from "../../../../database";
import Register from "../../../../models/registration";

export const dynamic = "force-dynamic";


export async function GET(request, content) {
    // if (req.method === 'GET') {
        try {
            await connectToDb();
            
            const  studentId = content.params.studentid
            const record = {_id:studentId}
            const result = await Register.findById(record)
            
            return NextResponse.json({result,success:true})
        } catch (error) {
            console.log("Error finding user by CNIC:", error);
            return NextResponse.json({success:false})
            // return res.status(500).json({ success: false, message: "Internal Server Error" });
          }
  }

  export async function PUT(request, content) {
    // if (req.method === 'GET') {
        try {
            await connectToDb();
            
            const  studentId = content.params.studentid
            const filter = {_id:studentId}
            const payload = await request.json();
            const result = await Register.findOneAndUpdate(filter,payload,{new:true})
            
            return NextResponse.json({result,success:true})
        } catch (error) {
            console.log("Error finding user by CNIC:", error);
            return NextResponse.json({success:false, error:error.message})
            // return res.status(500).json({ success: false, message: "Internal Server Error" });
          }
  }

  export async function DELETE(request, content) {
    // if (req.method === 'GET') {
        try {
            await connectToDb();
            
            const  studentId = content.params.studentid
            const record = {_id:studentId}
            const result = await Register.deleteOne(record)
            
            return NextResponse.json({result,success:true})
        } catch (error) {
            console.log("Error finding user by CNIC:", error);
            return NextResponse.json({success:false})
            // return res.status(500).json({ success: false, message: "Internal Server Error" });
          }
  }