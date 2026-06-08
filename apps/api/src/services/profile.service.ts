import { prisma } from "../config/database";
import type { ProfileUpdateInput } from "@tracksphere/validation";

export class ProfileService {
  async getProfile(userId: string) {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            username: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  }

  async updateProfile(userId: string, data: ProfileUpdateInput) {
    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        fullName: data.fullName,
        bio: data.bio,
        avatarUrl: data.avatarUrl,
        country: data.country,
        city: data.city,
        privacyLevel: data.privacyLevel,
      },
    });

    return profile;
  }
}

export const profileService = new ProfileService();
