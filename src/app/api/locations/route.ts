import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

interface ServerError {
  message: string;
}

export const GET = async () => {
  try {
    const { data, error } = await supabase.from("storage_locations").select("*");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Locations fetched successfully",
      data: data || [],
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
