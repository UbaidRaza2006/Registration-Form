<<<<<<< HEAD
import { NextResponse } from "next/server";
import Register from "../../../models/registration";
import connectToDb from "../../../database";





export const dynamic = "force-dynamic";


export async function GET(req) {

await connectToDb();

    const rollNoQuery = new URL(req.url).searchParams.get("rollNo");
    const cnicQuery = new URL(req.url).searchParams.get("cnic");


    try {
        if (!rollNoQuery && !cnicQuery) {
            const students = await Register.find();
            if (students.length > 0) {
              return NextResponse.json(
                {
                  success: true,
                  data: students,
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            } else {
              return NextResponse.json(
                {
                  success: false,
                  status: 204,
                  message: "No students found!",
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            }
          } else if(cnicQuery && rollNoQuery){
            const student = await Register.findOne({ rollNo: rollNoQuery, cnic: cnicQuery });
            if (student) {
              return NextResponse.json(
                {
                  success: true,
                    data: student,
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            } else {
              return NextResponse.json(
                {
                  success: false,
                  status: 204,
                  message: "Student not found in the database",
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            }
          } else if(rollNoQuery && !cnicQuery){

            const student = await Register.findOne({ rollNo: rollNoQuery });
            if (student) {
              return NextResponse.json(
                {
                  success: true,
                    data: student,
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            } else {
              return NextResponse.json(
                {
                  success: false,
                  status: 204,
                  message: "Student not found in the database",
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            }

          } else if(cnicQuery && !rollNoQuery){

            const student = await Register.find({ cnic: cnicQuery });
            if (student) {
              return NextResponse.json(
                {
                  success: true,
                    data: student,
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            } else {
              return NextResponse.json(
                {
                  success: false,
                  status: 204,
                  message: "Student not found in the database",
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            }

          }
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.json(
          {
            success: false,
            status: 500,
            message: "Internal Server Error",
          },
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
      }
    }
=======
import { NextResponse } from "next/server";
<<<<<<< HEAD
import Register from "../../../models/registration";
import connectToDb from "../../../database";




=======
import connectToDb from "../../../database";
import Register from "../../../models/registration.js";
>>>>>>> 05c27b43acd4a9e0e3599173eedffdaf66d28950

export const dynamic = "force-dynamic";

export async function GET(req) {
<<<<<<< HEAD

await connectToDb();

    const query = new URL(req.url).searchParams.get("rollNo");

    try {
        if (!query) {
            const students = await Register.find();
            if (students.length > 0) {
              return NextResponse.json(
                {
                  success: true,
                  data: students,
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            } else {
              return NextResponse.json(
                {
                  success: false,
                  status: 204,
                  message: "No students found!",
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            }
          } else {
            const student = await Register.findOne({ rollNo: query });
            if (student) {
              return NextResponse.json(
                {
                  success: true,
                    data: student,
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            } else {
              return NextResponse.json(
                {
                  success: false,
                  status: 204,
                  message: "Student not found in the database",
                },
                {
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }
              );
            }
          }
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.json(
          {
            success: false,
            status: 500,
            message: "Internal Server Error",
=======
  const query = new URL(req.url).searchParams.get("rollNo");

  try {
    if (!query) {
      const students = await Register.find();
      if (students.length > 0) {
        return NextResponse.json(
          {
            success: true,
            data: students,
          },
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            status: 204,
            message: "No students found!",
>>>>>>> 05c27b43acd4a9e0e3599173eedffdaf66d28950
          },
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
      }
<<<<<<< HEAD
    }
=======
    } else {
      const student = await Register.findOne({ rollNo: query });
      if (student) {
        return NextResponse.json(
          {
            success: true,
            data: student,
          },
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            status: 204,
            message: "Student not found in the database",
          },
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Internal Server Error",
      },
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
  }
}
>>>>>>> 05c27b43acd4a9e0e3599173eedffdaf66d28950
>>>>>>> 6ca6e3e391264a7f96eea448841ead264b5783dd
