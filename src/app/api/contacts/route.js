import { NextResponse } from "next/server";
import connectToDb from "../../../database";
import Inform from "../../../models/inform";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await connectToDb();

  try {
    const contacts = await Inform.find().sort({ _id: -1 });
    if (contacts.length > 0) {
      return NextResponse.json(
        {
          success: true,
          data: contacts,
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
          message: "No Contacts in the List!",
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

// New DELETE function to remove all contacts
export async function DELETE(req) {
  await connectToDb();

  try {
    const result = await Inform.deleteMany({});
    return NextResponse.json(
      {
        success: true,
        message: `${result.deletedCount} contacts deleted successfully!`,
      },
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("An error occurred while deleting contacts:", error);
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
