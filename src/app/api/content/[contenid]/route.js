// import { NextResponse } from "next/server";
// import connectToDb from "../../../../database";
// import Admin from "../../../../models/admin";

import { NextResponse } from "next/server";
import connectToDb from "../../../../database";
import Content from "../../../../models/content";

export async function PUT(request, content) {
  try {
    await connectToDb

    const contentId = content.params.contentid; // Extract adminId
    const filter = { _id: contentId }; // Build filter

    // Validate request body (optional but recommended)
    const payload = await request.json();
    // Perform basic validation here (e.g., required fields)

    const result = await Content.findOneAndUpdate(filter, payload, { new: true });

    if (!result) {
      // Handle the case where no matching admin is found
      throw new Error(`Content Image with ID "${contentId}" not found`);
    }

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error in editing an Content Image:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}