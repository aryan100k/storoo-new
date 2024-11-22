import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

interface BookingRequest {
  luggageType: string;
  duration: string;
}

interface ServerError {
  message: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { luggageType, duration } = body as BookingRequest;

    if (!luggageType || !duration) {
      return NextResponse.json(
        { error: "Missing required fields: luggageType and duration are required" },
        { status: 400 }
      );
    }

    // First, create a user with required fields
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        {
          name: "Test User",
          email: `user_${Date.now()}@example.com`, // Unique email
          phone: "+91" + Math.floor(Math.random() * 9000000000 + 1000000000), // Random phone number
        },
      ])
      .select()
      .single();

    if (userError) {
      console.error("User creation error:", userError);
      return NextResponse.json({ error: "User creation failed" }, { status: 500 });
    }

    // Get an existing location instead of creating new one
    const { data: locationData, error: locationError } = await supabase
      .from("storage_locations")
      .select("*")
      .limit(1)
      .single();

    if (locationError || !locationData) {
      console.error("Location fetch error:", locationError);
      return NextResponse.json(
        { error: locationError?.message || "No locations available" },
        { status: 500 }
      );
    }

    // Create the booking with existing location
    const result = await supabase
      .from("bookings")
      .insert([
        {
          user_id: userData.id,
          location_id: locationData.id,
          luggage_type: luggageType,
          duration: duration,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (result.error) {
      console.error("Booking creation error:", result.error);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Booking created successfully",
      data: result.data,
      bookingDetails: {
        userId: userData.id,
        locationId: locationData.id,
        luggageType,
        duration,
        status: "pending",
      },
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
