import { prisma } from "../config/database";
import { Prisma } from "@prisma/client";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async findByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async create(data: {
    username: string;
    email: string;
    passwordHash: string;
    fullName?: string;
  }) {
    return prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash: data.passwordHash,
        profile: {
          create: {
            fullName: data.fullName || null,
          },
        },
      },
      include: { profile: true },
    });
  }
}

export const userRepository = new UserRepository();
