"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@tracksphere/validation";
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
import { Radio, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    // TODO: Integrate with API in Sprint 2
    console.log("Login:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 gradient-mesh grid-pattern relative">
      {/* Background orb */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon/5 blur-3xl" />

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
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to continue tracking your journey
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-neon hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
