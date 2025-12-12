import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  console.log("Session:", JSON.stringify(session, null, 2));

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated", hasSession: !!session }, { status: 401 });
  }

  try {
    // Fetch user data including tweet count from Twitter API v2
    const response = await fetch(
      "https://api.twitter.com/2/users/me?user.fields=public_metrics,profile_image_url,description",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Twitter API error:", error);
      return NextResponse.json(
        { error: "Failed to fetch Twitter data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Twitter stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
