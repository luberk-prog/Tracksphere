import { userRepository } from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import type { RegisterInput, LoginInput } from "@tracksphere/validation";

export class AuthService {
  async register(input: RegisterInput) {
    // Check if email already exists
    const existingEmail = await userRepository.findByEmail(input.email);
    if (existingEmail) {
      throw new Error("Email already registered");
    }

    // Check if username already exists
    const existingUsername = await userRepository.findByUsername(input.username);
    if (existingUsername) {
      throw new Error("Username already taken");
    }

    // Hash password
    const passwordHash = await hashPassword(input.password);

    // Create user with profile
    const user = await userRepository.create({
      username: input.username,
      email: input.email,
      passwordHash,
      fullName: input.fullName,
    });

    // Generate token
    const token = signToken({ userId: user.id, email: user.email });

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async login(input: LoginInput) {
    // Find user
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isValid = await comparePassword(input.password, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    // Generate token
    const token = signToken({ userId: user.id, email: user.email });

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}

export const authService = new AuthService();
