import { prisma } from "../config/database";

export class SocialService {
  async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new Error("You cannot follow yourself");
    }

    // Check if target user exists
    const targetUser = await prisma.user.findUnique({ where: { id: followingId } });
    if (!targetUser) {
      throw new Error("Target user not found");
    }

    // Create follow
    const follow = await prisma.follow.upsert({
      where: {
        followerId_followingId: { followerId, followingId },
      },
      update: {},
      create: { followerId, followingId },
    });

    // Check for mutual follow to create friendship
    const reverseFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: followingId,
          followingId: followerId,
        },
      },
    });

    if (reverseFollow) {
      // Create friendship if it doesn't exist
      const [u1, u2] = [followerId, followingId].sort();
      await prisma.friendship.upsert({
        where: {
          userOneId_userTwoId: { userOneId: u1, userTwoId: u2 },
        },
        update: {},
        create: { userOneId: u1, userTwoId: u2 },
      });
    }

    return follow;
  }

  async unfollowUser(followerId: string, followingId: string) {
    await prisma.follow.delete({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    }).catch(() => {
      // Ignore if not following
    });

    // Remove friendship if it exists
    const [u1, u2] = [followerId, followingId].sort();
    await prisma.friendship.delete({
      where: {
        userOneId_userTwoId: { userOneId: u1, userTwoId: u2 },
      },
    }).catch(() => {
      // Ignore if no friendship
    });
  }

  async getFollowers(userId: string) {
    return prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                fullName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
  }

  async getFollowing(userId: string) {
    return prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                fullName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
  }
}

export const socialService = new SocialService();
