import { NextResponse } from "next/server";
import connectToDb from "../../../database";
import Register from "../../../models/registration";





export const dynamic = "force-dynamic";


export async function GET(req) {
    console.log(req.searchParams, "req")
    console.log(req.search, "req")
    // const { rollNo } = req.query;
    // console.log(rollNo, "rollnumber")


    try {
        await connectToDb();

        const extarctAllStudents = await Register.find({})

        if (extarctAllStudents) {
            return NextResponse.json({
                success: true,
                data: extarctAllStudents
            }, {
                headers: {
                    "Cache-Control": "no-cache"
                }
            })


        }
        else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No students found !"
            }, {
                headers: {
                    "Cache-Control": "no-cache"
                }
            })
        }


    } catch (e) {
        console.log("error-->", e)

        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later"
        }, {
            headers: {
                "Cache-Control": "no-cache"
            }
        })
    }


}


// export async function GET(req) {
//     console.log('SALAM')
//     const { rollNo } = req.query;

//     try {
//         await connectToDb();

//         // Check if the roll number is provided
//         if (!rollNo) {
//             return NextResponse.json({
//                 success: false,
//                 status: 400,
//                 message: "Roll number is required in the query parameters"
//             }, {
//                 headers: {
//                     "Cache-Control": "no-cache"
//                 }
//             });
//         }

//         // Query the database to find the student with the provided roll number
//         const student = await Register.findOne({ rollNo: rollNo });

//         // Check if the student with the provided roll number exists
//         if (student) {
//             return NextResponse.json({
//                 success: true,
//                 data: student
//             }, {
//                 headers: {
//                     "Cache-Control": "no-cache"
//                 }
//             });
//         } else {
//             return NextResponse.json({
//                 success: false,
//                 status: 404,
//                 message: "Student not found"
//             }, {
//                 headers: {
//                     "Cache-Control": "no-cache"
//                 }
//             });
//         }
//     } catch (e) {
//         console.log("error-->", e);
//         return NextResponse.json({
//             success: false,
//             message: "Something went wrong! Please try again later"
//         }, {
//             headers: {
//                 "Cache-Control": "no-cache"
//             }
//         });
//     }
// }



// export async function QUERYGET(req, res) {
//     try {
//         await connectToDb();

//         const { rollNo } = req.query; // Destructure rollNo from the query object
//         console.log("Roll number:", rollNo); // Add this line to check if rollNo is retrieved correctly

//         let query = {}; // Empty query object to fetch all users if no rollNo is provided
//         if (rollNo) {
//             query = { rollNo }; // If rollNo is provided, filter by rollNo
//         }

//         const results = await Register.find(query);

//         if (results.length > 0) {
//             res.status(200).json({ success: true, data: results });
//         } else {
//             res.status(404).json({ success: false, message: 'No users found' });
//         }
//     } catch (error) {
//         console.error("Error finding users:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// }