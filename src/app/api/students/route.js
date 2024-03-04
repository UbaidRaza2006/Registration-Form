import { NextResponse } from "next/server";
import connectToDb from "../../../database";
import Register from "../../../models/registration.js";

export const dynamic = "force-dynamic";

export async function GET(req) {
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
      },
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
  }
}
