"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@tracksphere/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Radio, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const passwordChecks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
  ];

  const onSubmit = async (data: RegisterInput) => {
    // TODO: Integrate with API in Sprint 2
    console.log("Register:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 gradient-mesh grid-pattern relative">
      {/* Background orb */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-neon/5 blur-3xl" />

      <div className="w-full max-w-md relative animate-fade-in-up">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-neon/20 flex items-center justify-center">
            <Radio className="w-6 h-6 text-neon" />
          </div>
          <span className="text-2xl font-bold">
            Track<span className="text-neon">Sphere</span>
          </span>
        </Link>

        <Card className="glass border-border/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Join TrackSphere and start tracking your journey
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}

                {/* Password strength indicator */}
                {password.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {passwordChecks.map((check) => (
                      <div
                        key={check.label}
                        className="flex items-center gap-2 text-xs"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            check.met
                              ? "text-neon"
                              : "text-muted-foreground/40"
                          }`}
                        />
                        <span
                          className={
                            check.met
                              ? "text-neon"
                              : "text-muted-foreground/60"
                          }
                        >
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-neon hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
