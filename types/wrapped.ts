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
}

export interface ReplyGuyData {
  username: string;
  name: string;
  profileImageUrl?: string;
  replyCount: number;
  isMock: boolean;
}

export interface TwitterRankData {
  rank: number;
  percentile: number;
  category: string;
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
