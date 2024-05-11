import { NextResponse } from "next/server";
import connectToDb from "../../../../database";
import Admin from "../../../../models/admin";

export async function PUT(request, content) {
  try {
    await connectToDb();

    const adminId = content.params.adminid; // Extract adminId
    const filter = { _id: adminId }; // Build filter

    // Validate request body (optional but recommended)
    const payload = await request.json();
    // Perform basic validation here (e.g., required fields)

    const result = await Admin.findOneAndUpdate(filter, payload, { new: true });

    if (!result) {
      // Handle the case where no matching admin is found
      throw new Error(`Admin with ID "${adminId}" not found`);
    }

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error in editing an Admin:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}