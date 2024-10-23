import { NextResponse } from "next/server";
import Inform from "../../../../models/inform";
import connectToDb from "../../../../database";

export async function DELETE(request, content) {
    // if (req.method === 'GET') {
        try {
            await connectToDb();
            
            const  contactId = content.params.contactid
            const record = {_id:contactId}
            const result = await Inform.deleteOne(record)
            
            return NextResponse.json({result,success:true})
        } catch (error) {
            console.log("Error in deleting this contact:", error);
            return NextResponse.json({success:false})
            // return res.status(500).json({ success: false, message: "Internal Server Error" });
          }
  }