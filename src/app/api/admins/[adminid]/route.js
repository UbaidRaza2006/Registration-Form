import { NextResponse } from "next/server";
import connectToDb from "../../../../database";
import Admin from "../../../../models/admin";
// import Register from "../../../../models/registration";


export async function PUT(request, content) {
    // if (req.method === 'GET') {
        try {
            await connectToDb();
            
            const  adminId = content.params.adminid
            const filter = {_id:adminId}
            const payload = await request.json();
            const result = await Admin.findOneAndUpdate(filter,payload,{new:true})
            
            return NextResponse.json({result,success:true})
        } catch (error) {
            console.log("Error in editing an Admin:", error);
            return NextResponse.json({success:false, error:error.message})
            // return res.status(500).json({ success: false, message: "Internal Server Error" });
          }
  }