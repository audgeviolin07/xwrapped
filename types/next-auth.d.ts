import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    twitterId?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    twitterId?: string;
    error?: string;
  }
}
