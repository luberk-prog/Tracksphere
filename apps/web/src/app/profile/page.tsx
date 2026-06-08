"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuthStore } from "@/stores/auth-store";
import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, MapPin, Globe, Loader2, Camera, Shield, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema, type ProfileUpdateInput } from "@tracksphere/validation";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get<any>("/profile");
        setProfile(response.data.profile);
        reset({
          fullName: response.data.profile.fullName || "",
          bio: response.data.profile.bio || "",
          avatarUrl: response.data.profile.avatarUrl || "",
          country: response.data.profile.country || "",
          city: response.data.profile.city || "",
          privacyLevel: response.data.profile.privacyLevel,
        });
      } catch (error) {
        setServerError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileUpdateInput) => {
    try {
      setServerError(null);
      const response = await api.patch<any>("/profile", data);
      setProfile(response.data.profile);
      setIsEditing(false);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Cover Header */}
          <div className="relative h-48 rounded-2xl bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] border border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(57,255,20,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative px-6 -mt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex items-end gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-2xl bg-[#0a0a0a] border-4 border-[#050505] overflow-hidden shadow-2xl">
                    {profile?.avatarUrl ? (
                      <img src={profile.avatarUrl} alt={user?.username} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#111]">
                        <User className="w-12 h-12 text-gray-600" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                      <Camera className="text-white w-8 h-8" />
                    </button>
                  )}
                </div>

                <div className="mb-2">
                  <h1 className="text-3xl font-bold text-white">
                    {profile?.fullName || user?.username}
                  </h1>
                  <p className="text-[#39FF14] font-medium">@{user?.username}</p>
                </div>
              </div>

              <div className="flex gap-3 mb-2">
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="bg-[#39FF14] text-black hover:bg-[#32e612] font-bold"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      className="border-white/10 text-white hover:bg-white/5"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {/* Left Column: Info Card */}
            <div className="md:col-span-1 space-y-6">
              <Card className="bg-[#0a0a0a] border-white/5 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">About Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-4 h-4 text-[#39FF14]" />
                    <span className="text-sm">{profile?.city || "Unknown City"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Globe className="w-4 h-4 text-[#39FF14]" />
                    <span className="text-sm">{profile?.country || "Unknown Country"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Shield className="w-4 h-4 text-[#39FF14]" />
                    <span className="text-sm capitalize">{profile?.privacyLevel} Profile</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0a0a0a] border-white/5 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-xs text-gray-400">Following</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-xs text-gray-400">Followers</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Edit/View Content */}
            <div className="md:col-span-2 space-y-6">
              {isEditing ? (
                <Card className="bg-[#0a0a0a] border-white/5 shadow-2xl">
                  <CardHeader>
                    <CardTitle>Edit Your Information</CardTitle>
                    <CardDescription className="text-gray-500">
                      Update your profile details and how others see you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Full Name</label>
                          <Input 
                            {...register("fullName")}
                            placeholder="Your full name"
                            className="bg-black/40 border-white/10 focus:border-[#39FF14]/50"
                          />
                          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Privacy Level</label>
                          <select 
                            {...register("privacyLevel")}
                            className="w-full bg-black/40 border-white/10 rounded-md p-2 text-sm text-white focus:outline-none focus:border-[#39FF14]/50"
                          >
                            <option value="public">Public</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Private</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Bio</label>
                        <Textarea 
                          {...register("bio")}
                          placeholder="Tell us about yourself..."
                          className="bg-black/40 border-white/10 focus:border-[#39FF14]/50 min-h-[100px]"
                        />
                        {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">City</label>
                          <Input 
                            {...register("city")}
                            placeholder="New York"
                            className="bg-black/40 border-white/10 focus:border-[#39FF14]/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Country</label>
                          <Input 
                            {...register("country")}
                            placeholder="USA"
                            className="bg-black/40 border-white/10 focus:border-[#39FF14]/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Avatar URL</label>
                        <Input 
                          {...register("avatarUrl")}
                          placeholder="https://example.com/avatar.jpg"
                          className="bg-black/40 border-white/10 focus:border-[#39FF14]/50"
                        />
                      </div>

                      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[#39FF14] text-black hover:bg-[#32e612] font-bold py-6"
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                          <>
                            <Save className="w-5 h-5 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-[#0a0a0a] border-white/5 shadow-2xl">
                  <CardHeader>
                    <CardTitle>Activity Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      {profile?.bio || "No biography provided yet. Athlete is focusing on their training."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
