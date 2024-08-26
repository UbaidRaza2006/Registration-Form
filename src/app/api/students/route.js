import { NextResponse } from "next/server";
import Register from "../../../models/registration";
import connectToDb from "../../../database";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await connectToDb();

//     const page = parseInt(new URL(req.url).searchParams.get("page")) || 1 ; // Get page number from query parameters, default to page 1
//   const limit = 20;
//   const skip = page * limit

  const rollNoQuery = new URL(req.url).searchParams.get("rollNo");
  const cnicQuery = new URL(req.url).searchParams.get("cnic");
  const cityQuery = new URL(req.url).searchParams.get("city");
  const genderQuery = new URL(req.url).searchParams.get("gender");
  const statusQuery = new URL(req.url).searchParams.get("status");
  const batchQuery = new URL(req.url).searchParams.get("batch");
  const courseQuery = new URL(req.url).searchParams.get("course");
  const paymentQuery = new URL(req.url).searchParams.get("payment"); // Extracting payment query parameter

  try {

      
      
      if (!rollNoQuery && !cnicQuery && !cityQuery && !genderQuery && !courseQuery && !batchQuery && !statusQuery && !paymentQuery) {


          const totalUsers = await Register.countDocuments();
          const pageSize = totalUsers < 10 ? totalUsers : 10;
      
          const page = parseInt(new URL(req.url).searchParams.get("page")) || 1;
          const skip = (page - 1) * pageSize;
          const students = await Register.find().sort({_id: -1}).skip(skip).limit(pageSize); // Implement pagination

          
          if (students.length > 0) {

            const encodedStudents = students.map(student => ({
                rollNo:student.rollNo,
                batch:student.batch,
                _id:student._id,
                fullName: encodeURIComponent(student.fullName),
                fatherName: encodeURIComponent(student.fatherName),
                email: encodeURIComponent(student.email),
                course: encodeURIComponent(student.course),
                payment: encodeURIComponent(student.payment),
                paymentImg: encodeURIComponent(student.paymentImg),
                status: encodeURIComponent(student.status),
                otherStatus: encodeURIComponent(student.otherStatus),
                city: encodeURIComponent(student.city),
                cnic: encodeURIComponent(student.cnic),
                phone: encodeURIComponent(student.phone),
                dateOfBirth: encodeURIComponent(student.dateOfBirth),
                gender: encodeURIComponent(student.gender),
                qualification: encodeURIComponent(student.qualification),
                address: encodeURIComponent(student.address),
                imageUrl: encodeURIComponent(student.imageUrl)
            }));

            const hasMore = totalUsers > skip + 10   ;

              return NextResponse.json({
                  success: true,
                  data: encodedStudents,
                    more:hasMore,
                    totalUsers:totalUsers,
                    skip:skip+10,
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
          } else {
              return NextResponse.json({
                  success: false,
                  status: 204,
                  message: "No students found!",
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
          }
      } else if (cnicQuery || rollNoQuery) {
          const filter1 = {};
          if (rollNoQuery) filter1.rollNo = rollNoQuery;
          if (cnicQuery) filter1.cnic = cnicQuery;

          const students = await Register.find(filter1).sort({_id: -1});

          const encodedStudents = students.map(student => ({
            rollNo:student.rollNo,
                batch:student.batch,
                _id:student._id,
            fullName: encodeURIComponent(student.fullName),
            fatherName: encodeURIComponent(student.fatherName),
            email: encodeURIComponent(student.email),
            course: encodeURIComponent(student.course),
            payment: encodeURIComponent(student.payment),
            paymentImg: encodeURIComponent(student.paymentImg),
            status: encodeURIComponent(student.status),
            otherStatus: encodeURIComponent(student.otherStatus),
            city: encodeURIComponent(student.city),
            cnic: encodeURIComponent(student.cnic),
            phone: encodeURIComponent(student.phone),
            dateOfBirth: encodeURIComponent(student.dateOfBirth),
            gender: encodeURIComponent(student.gender),
            qualification: encodeURIComponent(student.qualification),
            address: encodeURIComponent(student.address),
            imageUrl: encodeURIComponent(student.imageUrl)
        }));

          if (students.length > 0) {
            console.log("encodedStudents-->",encodedStudents)
              return NextResponse.json({
                  success: true,
                  data: encodedStudents,
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
          } else {
              return NextResponse.json({
                  success: false,
                  status: 204,
                  message: "No students found!",
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
          }
      } else {
          // Building the filter object based on provided query parameters
          const filter2 = {};
          if (cityQuery) filter2.city = cityQuery;
          if (genderQuery) filter2.gender = genderQuery;
          if (statusQuery) filter2.status = statusQuery;
          if (batchQuery) filter2.batch = batchQuery;
          if (courseQuery) filter2.course = courseQuery;
          if (paymentQuery) filter2.payment = paymentQuery; // Adding payment query parameter to the filter

          // Find students based on the filter
          const students = await Register.find(filter2).sort({_id: -1});

          if (students.length > 0) {

            const encodedStudents = students.map(student => ({
                rollNo:student.rollNo,
                batch:student.batch,
                _id:student._id,
                fullName: encodeURIComponent(student.fullName),
                fatherName: encodeURIComponent(student.fatherName),
                email: encodeURIComponent(student.email),
                course: encodeURIComponent(student.course),
                payment: encodeURIComponent(student.payment),
                paymentImg: encodeURIComponent(student.paymentImg),
                status: encodeURIComponent(student.status),
                otherStatus: encodeURIComponent(student.otherStatus),
                city: encodeURIComponent(student.city),
                cnic: encodeURIComponent(student.cnic),
                phone: encodeURIComponent(student.phone),
                dateOfBirth: encodeURIComponent(student.dateOfBirth),
                gender: encodeURIComponent(student.gender),
                qualification: encodeURIComponent(student.qualification),
                address: encodeURIComponent(student.address),
                imageUrl: encodeURIComponent(student.imageUrl)
            }));


              return NextResponse.json({
                  success: true,
                  data: encodedStudents,
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
          } else {
              return NextResponse.json({
                  success: false,
                  status: 204,
                  message: "No students found!",
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
          }
      }
  } catch (error) {
      console.error("An error occurred:", error);
      return NextResponse.json({
          success: false,
          status: 500,
          message: "Internal Server Error",
      }, {
          headers: {
              "Cache-Control": "no-cache",
          },
      });
  }
}




// import { NextResponse } from "next/server";
// import Register from "../../../models/registration";
// import connectToDb from "../../../database";

// export const dynamic = "force-dynamic";

// export async function GET(req) {
//     await connectToDb();

//     const rollNoQuery = new URL(req.url).searchParams.get("rollNo");
//     const cnicQuery = new URL(req.url).searchParams.get("cnic");
//     const cityQuery = new URL(req.url).searchParams.get("city");
//     const genderQuery = new URL(req.url).searchParams.get("gender");
//     const statusQuery = new URL(req.url).searchParams.get("status");
//     const batchQuery = new URL(req.url).searchParams.get("batch");
//     const courseQuery = new URL(req.url).searchParams.get("course");
//     const paymentQuery = new URL(req.url).searchParams.get("payment");

//     try {
//         if (!rollNoQuery && !cnicQuery && !cityQuery && !genderQuery && !courseQuery && !batchQuery && !statusQuery && !paymentQuery) {
//             const students = await Register.find().sort({_id:-1});
//             if (students.length > 0) {
//                 const decodedStudents = students.map(student => ({
//                     ...student,
//                     fullName: decodeURIComponent(student.fullName),
//                     fatherName: decodeURIComponent(student.fatherName),
//                     email: decodeURIComponent(student.email),
//                     course: decodeURIComponent(student.course),
//                     payment: decodeURIComponent(student.payment),
//                     paymentImg: decodeURIComponent(student.paymentImg),
//                     status: decodeURIComponent(student.status),
//                     city: decodeURIComponent(student.city),
//                     cnic: decodeURIComponent(student.cnic),
//                     phone: decodeURIComponent(student.phone),
//                     dateOfBirth: decodeURIComponent(student.dateOfBirth),
//                     gender: decodeURIComponent(student.gender),
//                     qualification: decodeURIComponent(student.qualification),
//                     address: decodeURIComponent(student.address),
//                     imageUrl: decodeURIComponent(student.imageUrl)
//                 }));
//                 return NextResponse.json({
//                     success: true,
//                     data: decodedStudents,
//                 }, {
//                     headers: {
//                         "Cache-Control": "no-cache",
//                     },
//                 });
//             } else {
//                 return NextResponse.json({
//                     success: false,
//                     status: 204,
//                     message: "No students found!",
//                 }, {
//                     headers: {
//                         "Cache-Control": "no-cache",
//                     },
//                 });
//             }
//         } else if (cnicQuery || rollNoQuery) {
//             const filter1 = {};
//                       if (rollNoQuery) filter1.rollNo = rollNoQuery;
//                       if (cnicQuery) filter1.cnic = cnicQuery;
            
//                       const students = await Register.find(filter1).sort({_id: -1});
            
//                       const encodedStudents = students.map(student => ({
//                         ...student._doc,
//                         address: encodeURIComponent(student.address),
//                         qualification: encodeURIComponent(student.qualification),
//                       }));
            
//                       if (students.length > 0) {
//                         console.log("encodedStudents-->",encodedStudents)
//                           return NextResponse.json({
//                               success: true,
//                               data: encodedStudents,
//                           }, {
//                               headers: {
//                                   "Cache-Control": "no-cache",
//                               },
//                           });
//                         }
//         } else {
//             return NextResponse.json({
//                                   success: false,
//                                   status: 204,
//                                   message: "No students found!",
//                               }, {
//                                   headers: {
//                                       "Cache-Control": "no-cache",
//                                   },
//                               });
//         }
//     } catch (error) {
//         console.error("An error occurred:", error);
//         return NextResponse.json({
//             success: false,
//             status: 500,
//             message: "Internal Server Error"
//         }, {
//             headers: {
//                 "Cache-Control": "no-cache"
//             }
//         });
//     }
// }

