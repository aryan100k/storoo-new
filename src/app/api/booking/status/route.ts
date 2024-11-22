import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

interface ServerError {
  message: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const bookingId = req.nextUrl.searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        users (*),
        storage_locations (*)
      `
      )
      .eq("id", bookingId)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Booking status fetched successfully",
      data: data,
    });
  } catch (error: unknown) {
    console.error("Server error:", error);
    const serverError = error as ServerError;

    return NextResponse.json(
      {
        error: "Internal server error",
        details: serverError.message,
      },
      { status: 500 }
    );
  }
};
