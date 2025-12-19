import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { aggregateWrappedData } from "@/lib/wrapped/data-aggregator";
import { UserProfile } from "@/types/wrapped";
import { getMockUserProfile } from "@/lib/wrapped/mock-data";

// Simple in-memory cache to avoid hitting Twitter API rate limits
// Cache expires after 5 minutes
const userCache = new Map<string, { data: UserProfile; expires: number }>();

export async function GET() {
  const session = await getServerSession(authOptions);

  // Check if session exists but has a refresh error
  if (session?.error === "RefreshAccessTokenError") {
    return NextResponse.json(
      { error: "Session expired. Please sign in again." },
      { status: 401 }
    );
  }

  if (!session?.accessToken) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    let userProfile: UserProfile;

    // Check cache first
    const cached = userCache.get(session.accessToken);
    const now = Date.now();

    if (cached && cached.expires > now) {
      console.log('[API] Using cached user profile');
      userProfile = cached.data;
    } else {
      // Fetch user data from Twitter API
      console.log('[API] Fetching fresh user profile from Twitter');
      const response = await fetch(
        "https://api.twitter.com/2/users/me?user.fields=public_metrics,profile_image_url",
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error("Twitter API error:", error);

        // If rate limited (429), use mock data instead of returning error
        if (response.status === 429) {
          console.log('[API] Rate limited - using mock user profile');
          userProfile = getMockUserProfile();
        } else {
          return NextResponse.json(
            { error: "Failed to fetch Twitter data" },
            { status: response.status }
          );
        }
      } else {
        const twitterData = await response.json();

        // Transform to UserProfile type
        userProfile = {
          name: twitterData.data.name,
          username: twitterData.data.username,
          profileImageUrl: twitterData.data.profile_image_url,
          metrics: {
            followersCount: twitterData.data.public_metrics.followers_count,
            followingCount: twitterData.data.public_metrics.following_count,
            tweetCount: twitterData.data.public_metrics.tweet_count,
            listedCount: twitterData.data.public_metrics.listed_count,
          }
        };

        // Cache for 5 minutes
        userCache.set(session.accessToken, {
          data: userProfile,
          expires: now + 5 * 60 * 1000
        });
      }
    }

    // Aggregate with mock data
    const wrappedData = await aggregateWrappedData(
      userProfile,
      session.accessToken
    );

    return NextResponse.json(wrappedData);
  } catch (error) {
    console.error("Error fetching wrapped data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
