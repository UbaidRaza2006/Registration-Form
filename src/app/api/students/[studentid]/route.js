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

            const encodedResult = {
              ...result,
              rollNo:result.rollNo,
              batch:result.batch,
              _id:result._id,
              fullName: encodeURIComponent(result.fullName),
              fatherName: encodeURIComponent(result.fatherName),
              email: encodeURIComponent(result.email),
              course: encodeURIComponent(result.course),
              payment: encodeURIComponent(result.payment),
              paymentImg: encodeURIComponent(result.paymentImg),
              status: encodeURIComponent(result.status),
              city: encodeURIComponent(result.city),
              cnic: encodeURIComponent(result.cnic),
              phone: encodeURIComponent(result.phone),
              dateOfBirth: encodeURIComponent(result.dateOfBirth),
              gender: encodeURIComponent(result.gender),
              qualification: encodeURIComponent(result.qualification),
              address: encodeURIComponent(result.address),
              imageUrl: encodeURIComponent(result.imageUrl),
          };

            
            return NextResponse.json({result:encodedResult,success:true})
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
            
            const encodedResult = {
              ...result,
              rollNo:result.rollNo,
              batch:result.batch,
              _id:result._id,
              fullName: encodeURIComponent(result.fullName),
              fatherName: encodeURIComponent(result.fatherName),
              email: encodeURIComponent(result.email),
              course: encodeURIComponent(result.course),
              payment: encodeURIComponent(result.payment),
              paymentImg: encodeURIComponent(result.paymentImg),
              status: encodeURIComponent(result.status),
              city: encodeURIComponent(result.city),
              cnic: encodeURIComponent(result.cnic),
              phone: encodeURIComponent(result.phone),
              dateOfBirth: encodeURIComponent(result.dateOfBirth),
              gender: encodeURIComponent(result.gender),
              qualification: encodeURIComponent(result.qualification),
              address: encodeURIComponent(result.address),
              imageUrl: encodeURIComponent(result.imageUrl)
          };


            return NextResponse.json({result:encodedResult,success:true})
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

            const encodedResult = {
              ...result,
              fullName: encodeURIComponent(result.fullName),
              fatherName: encodeURIComponent(result.fatherName),
              email: encodeURIComponent(result.email),
              course: encodeURIComponent(result.course),
              payment: encodeURIComponent(result.payment),
              paymentImg: encodeURIComponent(result.paymentImg),
              status: encodeURIComponent(result.status),
              city: encodeURIComponent(result.city),
              cnic: encodeURIComponent(result.cnic),
              phone: encodeURIComponent(result.phone),
              dateOfBirth: encodeURIComponent(result.dateOfBirth),
              gender: encodeURIComponent(result.gender),
              qualification: encodeURIComponent(result.qualification),
              address: encodeURIComponent(result.address),
              imageUrl: encodeURIComponent(result.imageUrl)
          };
            
            return NextResponse.json({result:encodedResult,success:true})
        } catch (error) {
            console.log("Error finding user by CNIC:", error);
            return NextResponse.json({success:false})
            // return res.status(500).json({ success: false, message: "Internal Server Error" });
          }
  }