import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Activity,
  Shield,
  Users,
  Zap,
  ChevronRight,
  Globe,
  MessageCircle,
  Radio,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Activity Tracking",
    description:
      "Track running, cycling, hiking, gym workouts, and more with precise GPS data.",
  },
  {
    icon: MapPin,
    title: "Live Location",
    description:
      "Share your real-time location with friends and family during activities.",
  },
  {
    icon: Shield,
    title: "Emergency SOS",
    description:
      "One-tap emergency alerts with GPS coordinates sent to your contacts.",
  },
  {
    icon: Users,
    title: "Social Network",
    description:
      "Follow friends, share achievements, and compete on leaderboards.",
  },
  {
    icon: Globe,
    title: "Heatmaps",
    description:
      "Visualize your activity patterns with beautiful, interactive heatmaps.",
  },
  {
    icon: MessageCircle,
    title: "Direct Messaging",
    description:
      "Chat with your fitness community and coordinate group activities.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neon/20 flex items-center justify-center">
              <Radio className="w-5 h-5 text-neon" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Track<span className="text-neon">Sphere</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                Get Started
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 gradient-mesh grid-pattern overflow-hidden">
        {/* Animated orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon/5 blur-3xl animate-pulse" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5 text-neon text-sm font-medium mb-8 animate-fade-in-up">
            <Zap className="w-4 h-4" />
            <span>Now in Beta — Join the Future of Fitness</span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Track. Share.
            <br />
            <span className="text-neon neon-text">Stay Safe.</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            The all-in-one platform for fitness tracking, social networking, and
            personal safety. GPS-powered activities, live location sharing, and
            emergency SOS — all in one place.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/register">
              <Button size="lg" className="text-base px-10">
                Start Tracking
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-base px-10">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { value: "10K+", label: "Active Users" },
              { value: "1M+", label: "Activities Logged" },
              { value: "50+", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-neon">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need,{" "}
              <span className="text-neon">One Platform</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From GPS tracking to emergency SOS, TrackSphere combines the best
              features of your favorite apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border border-border/50 bg-card/50 hover:border-neon/30 hover:bg-card/80 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-neon/10 flex items-center justify-center mb-4 group-hover:bg-neon/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-neon" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 gradient-mesh">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of athletes who track, share, and stay safe with
            TrackSphere.
          </p>
          <Link href="/register">
            <Button size="lg" className="text-base px-12 animate-pulse-glow">
              Create Free Account
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-neon" />
            <span className="font-semibold">
              Track<span className="text-neon">Sphere</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 TrackSphere. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
