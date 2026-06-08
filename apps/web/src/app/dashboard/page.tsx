import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Radio,
  Activity,
  Route,
  Gauge,
  Users,
  Bell,
  MapPin,
  LogOut,
  Settings,
  User,
  TrendingUp,
  Calendar,
  Timer,
} from "lucide-react";

const stats = [
  {
    title: "Total Distance",
    value: "0.0 km",
    change: "Start tracking!",
    icon: Route,
    color: "text-neon",
    bgColor: "bg-neon/10",
  },
  {
    title: "Activities",
    value: "0",
    change: "No activities yet",
    icon: Activity,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    title: "Avg Speed",
    value: "0.0 km/h",
    change: "Complete an activity",
    icon: Gauge,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    title: "Friends Online",
    value: "0",
    change: "Add friends to see",
    icon: Users,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    title: "Notifications",
    value: "0",
    change: "All caught up",
    icon: Bell,
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
  },
];

const quickActions = [
  { label: "Start Activity", icon: Activity, href: "#" },
  { label: "Share Location", icon: MapPin, href: "#" },
  { label: "View Stats", icon: TrendingUp, href: "#" },
  { label: "Schedule", icon: Calendar, href: "#" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-border/50 bg-card/50 backdrop-blur-sm hidden lg:flex flex-col z-40">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-border/50">
          <div className="w-8 h-8 rounded-lg bg-neon/20 flex items-center justify-center">
            <Radio className="w-5 h-5 text-neon" />
          </div>
          <span className="text-lg font-bold">
            Track<span className="text-neon">Sphere</span>
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {[
            { label: "Dashboard", icon: Activity, active: true },
            { label: "Activities", icon: Timer, active: false },
            { label: "Heatmaps", icon: MapPin, active: false },
            { label: "Friends", icon: Users, active: false },
            { label: "Messages", icon: Bell, active: false },
            { label: "Settings", icon: Settings, active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                item.active
                  ? "bg-neon/10 text-neon border border-neon/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-neon/20 flex items-center justify-center">
              <User className="w-4.5 h-4.5 text-neon" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">New User</p>
              <p className="text-xs text-muted-foreground truncate">
                user@tracksphere.com
              </p>
            </div>
            <Link href="/login">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LogOut className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 glass z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-neon" />
          <span className="font-bold">
            Track<span className="text-neon">Sphere</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="w-4.5 h-4.5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center">
            <User className="w-4 h-4 text-neon" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 lg:pt-6 pb-8 px-4 lg:px-8">
        {/* Welcome header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to <span className="text-neon neon-text">TrackSphere</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Your personal fitness dashboard — start tracking your activities
            today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 bg-card/50 hover:border-neon/30 hover:bg-neon/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                <action.icon className="w-5 h-5 text-neon" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card
              key={stat.title}
              className="animate-fade-in-up hover:neon-glow transition-all duration-500"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                >
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activity & Map Placeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-neon" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Activity className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground font-medium">
                  No activities yet
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Start tracking to see your activities here
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Start First Activity
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-neon" />
                Activity Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg bg-muted/30 border border-border/30 flex items-center justify-center relative overflow-hidden">
                {/* Fake map grid */}
                <div className="absolute inset-0 grid-pattern opacity-50" />
                <div className="absolute inset-0 gradient-mesh" />
                <div className="relative text-center">
                  <MapPin className="w-10 h-10 text-neon/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Map view coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
