// import { NextResponse } from "next/server";
// import Register from "../../../models/registration";
// import connectToDb from "../../../database";

import { NextResponse } from "next/server";
import connectToDb from "../../../database";
import Admin from "../../../models/admin";





export const dynamic = "force-dynamic";


export async function GET(req) {
  await connectToDb();

  try {
          const admin = await Admin.find()
          if (admin.length > 0) {
              return NextResponse.json({
                  success: true,
                  data: admin,
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
          } else {
              return NextResponse.json({
                  success: false,
                  status: 204,
                  message: "Issue in fetching Admin!",
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
            }
        
  } catch (error) {
      console.error("An error occurred:", error);
      return NextResponse.json({
          success: false,
          status: 500,
          message: "Internal Server Error"
      }, {
          headers: {
              "Cache-Control": "no-cache"
          }
      });
  }
}