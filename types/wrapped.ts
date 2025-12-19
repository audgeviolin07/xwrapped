export interface UserProfile {
  name: string;
  username: string;
  profileImageUrl?: string;
  metrics: {
    followersCount: number;
    followingCount: number;
    tweetCount: number;
    listedCount: number;
  };
}

export interface PersonaData {
  title: string;
  description: string;
  iconType: string;
  isMock: boolean;
  mbti?: {
    code: string;          // e.g., "INTJ-A"
    type: string;          // e.g., "INTJ"
    variant?: string;      // e.g., "A" (Assertive) or "T" (Turbulent)
    category: string;      // e.g., "Analysts", "Diplomats", etc.
    traits?: {
      mind: number;        // Introversion (0) vs Extraversion (100)
      energy: number;      // Intuition (0) vs Sensing (100)
      nature: number;      // Thinking (0) vs Feeling (100)
      tactics: number;     // Judging (0) vs Perceiving (100)
      identity: number;    // Turbulent (0) vs Assertive (100)
    };
  };
}

export interface ReplyGuyData {
  username: string;
  name: string;
  profileImageUrl?: string;
  replyCount: number;
  isMock: boolean;
}

export interface Classification {
  level: number;
  title: string;
}

export interface TwitterRankData {
  rank: number;
  percentile: number;
  category: string;
  classification: Classification;
}

export interface WrappedData {
  user: UserProfile;
  persona: PersonaData;
  replyGuy: ReplyGuyData;
  rank: TwitterRankData;
}

export interface SlideProps {
  data: WrappedData;
}
