// Import necessary dependencies
import { NextResponse } from "next/server";
import connectToDb from "../../../database";
import Register from "../../../models/registration";

// Export default async function handler
export async function GET(req, res) {
  try {
    // Connect to MongoDB
    // const { db } = await connectToDb();
  await connectToDb();


    // Aggregate query to group users by city and count
    const cities = await Register.aggregate(
      [
        {
          $group: {
            _id: "$city",
          }
        }
      ]
    )

    // Send the unique city names as response
    // res.status(200).json({ cities });
    return NextResponse.json({
      success: true,
      data: cities,
  });
  } catch (error) {
    // Handle any errors
    console.error("An error occurred:", error);
    // res.status(500).json({ error: 'Internal Server Error' });
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
  });
  }
}
