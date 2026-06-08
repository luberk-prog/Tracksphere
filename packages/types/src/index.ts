// ========================
// User
// ========================
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  provider: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  profile?: Profile;
}

// ========================
// Profile
// ========================
export type PrivacyLevel = "public" | "friends" | "private";

export interface Profile {
  id: string;
  userId: string;
  fullName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  country: string | null;
  city: string | null;
  privacyLevel: PrivacyLevel;
}

// ========================
// Follow
// ========================
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

// ========================
// API Responses
// ========================
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface AuthResponse {
  user: Omit<User, "passwordHash">;
  token: string;
}

// ========================
// Auth DTOs
// ========================
export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

// ========================
// Profile DTOs
// ========================
export interface ProfileUpdateDto {
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
  country?: string;
  city?: string;
  privacyLevel?: PrivacyLevel;
}

// ========================
// Social DTOs
// ========================
export interface FollowResponse {
  isFollowing: boolean;
  followerCount: number;
  followingCount: number;
}

export interface FriendshipResponse {
  id: string;
  userOneId: string;
  userTwoId: string;
  createdAt: Date;
}
