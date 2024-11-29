import { NextResponse } from "next/server";
import connectToDb from "../../../../database";
import Content from "../../../../models/content";

export async function PUT(request, { params }) {
  try {
    await connectToDb();
    
    // Correctly access the contentid parameter from params
    const contentId = params.contenid; // Use "contenid" as per the console output

    if (!contentId) {
      throw new Error('Content ID is missing or invalid.');
    }

    const filter = { _id: contentId }; // Build filter based on contentId

    const payload = await request.json(); // Extract data from request body

    // Perform the update operation
    const result = await Content.findOneAndUpdate(filter, payload, { new: true });

    if (!result) {
      throw new Error(`Content Image with ID "${contentId}" not found`);
    }

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error in editing Content Image:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
