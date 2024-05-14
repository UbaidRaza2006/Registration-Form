import { NextResponse } from "next/server";
import Register from "../../../models/registration";
import connectToDb from "../../../database";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await connectToDb();

  const rollNoQuery = new URL(req.url).searchParams.get("rollNo");
  const cnicQuery = new URL(req.url).searchParams.get("cnic");
  const cityQuery = new URL(req.url).searchParams.get("city");
  const genderQuery = new URL(req.url).searchParams.get("gender");
  const statusQuery = new URL(req.url).searchParams.get("status");
  const batchQuery = new URL(req.url).searchParams.get("batch");
  const courseQuery = new URL(req.url).searchParams.get("course");
  const paymentQuery = new URL(req.url).searchParams.get("payment");

  try {
    let filter = {};
    if (rollNoQuery) filter.rollNo = rollNoQuery;
    if (cnicQuery) filter.cnic = cnicQuery;
    if (cityQuery) filter.city = cityQuery;
    if (genderQuery) filter.gender = genderQuery;
    if (statusQuery) filter.status = statusQuery;
    if (batchQuery) filter.batch = batchQuery;
    if (courseQuery) filter.course = courseQuery;
    if (paymentQuery) filter.payment = paymentQuery;

    const students = await Register.find(filter).sort({ _id: -1 });

    if (students.length > 0) {
      // Encode address and qualification fields
      const encodedStudents = students.map(student => ({
        ...student._doc,
        address: encodeURIComponent(student.address),
        qualification: encodeURIComponent(student.qualification),
      }));

      return NextResponse.json(
        {
          success: true,
          data: encodedStudents,
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
