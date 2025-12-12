import { UserProfile, TwitterRankData, WrappedData } from '@/types/wrapped';
import { getMockPersona, getMockReplyGuy } from './mock-data';

/**
 * Calculate Twitter rank based on user metrics.
 * Uses engagement score (followers + tweets) to estimate ranking.
 */
function calculateRank(metrics: UserProfile['metrics']): TwitterRankData {
  const { followersCount, tweetCount } = metrics;

  // Engagement score based on followers and activity
  const engagementScore = followersCount + (tweetCount * 2);

  // Estimate rank - higher engagement = lower rank number (better)
  // Using logarithmic scale for more realistic distribution
  const estimatedRank = Math.max(1, Math.floor(1000000 / Math.log10(engagementScore + 10)));

  // Calculate percentile (top X%)
  // Assume ~500M active users, calculate what percentile this rank represents
  const percentile = Math.max(1, Math.min(99, Math.floor((1 - estimatedRank / 500000000) * 100)));

  // Determine category based on primary strength
  let category = 'Engagement';
  if (followersCount > tweetCount * 10) {
    category = 'Influence';
  } else if (tweetCount > followersCount) {
    category = 'Activity';
  }

  return { rank: estimatedRank, percentile, category };
}

/**
 * Aggregates all wrapped data for a user.
 * Currently uses mock data for persona, reply guy, and rank.
 *
 * TO REPLACE WITH REAL DATA:
 * 1. Create new calculation functions in this file (e.g., calculatePersona)
 * 2. Replace getMock* calls with real implementations
 * 3. Set isMock: false in returned data
 * 4. Remove mock functions when no longer needed
 *
 * @param userProfile - Real user data from Twitter API
 * @param accessToken - Twitter API access token for additional requests
 */
export async function aggregateWrappedData(
  userProfile: UserProfile,
  accessToken: string
): Promise<WrappedData> {
  // Real user data from Twitter API
  const user = userProfile;

  // TODO: Replace these with real implementations
  const persona = getMockPersona();
  const replyGuy = getMockReplyGuy(user.username);
  const rank = calculateRank(user.metrics);

  return {
    user,
    persona,
    replyGuy,
    rank
  };
}
