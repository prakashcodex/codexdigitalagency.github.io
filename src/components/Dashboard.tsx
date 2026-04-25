import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  User as UserIcon, 
  Video, 
  Users, 
  Settings, 
  LogOut,
  PlayCircle,
  Calendar,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import { motion, AnimatePresence } from "motion/react";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { getUserProfile } from "../services/dbService";

type Tab = "overview" | "profile" | "classes" | "community";

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserData(profile);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "profile", label: "My Profile", icon: UserIcon },
    { id: "classes", label: "Live Classes", icon: Video },
    { id: "community", label: "Community", icon: Users },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-orange-600">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  const firstName = userData?.name?.split(' ')[0] || "Student";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-xl text-orange-600">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white">C</div>
            <span>Codex Academy</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? "bg-orange-50 text-orange-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20">
          <div className="font-bold text-orange-600">Codex Academy</div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5 text-red-600" />
          </Button>
        </header>

        <div className="p-4 sm:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {firstName}! 👋</h1>
                    <p className="text-gray-500">You have a live class starting in 45 minutes.</p>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700 rounded-full">
                    Join Class Now
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Next Class</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                          <Video className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Advanced Prompt Engineering</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" /> Today, 6:00 PM
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Course Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">AI Skills Mastery</span>
                          <span className="text-orange-600 font-bold">45%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 w-[45%]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Referral Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-900">₹2,400</div>
                        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 p-0">
                          View Details <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">Recent Lessons</h2>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors cursor-pointer group">
                          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                            <PlayCircle className="w-6 h-6 text-gray-400 group-hover:text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">Lesson {i}: Introduction to LLMs</h4>
                            <p className="text-xs text-gray-500">Completed 2 days ago • 45 mins</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">Announcements</h2>
                    <div className="p-6 bg-orange-600 rounded-3xl text-white relative overflow-hidden">
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-2">New Module Released! 🚀</h3>
                        <p className="text-orange-100 text-sm mb-4">
                          "Advanced Content Strategy" is now live. Learn how to build a viral personal brand.
                        </p>
                        <Button className="bg-white text-orange-600 hover:bg-orange-50 rounded-full font-bold">
                          Explore Module
                        </Button>
                      </div>
                      <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <UserProfile userData={userData} />
              </motion.div>
            )}

            {(activeTab === "classes" || activeTab === "community") && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <Settings className="w-10 h-10 animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Coming Soon</h2>
                  <p className="text-gray-500">We're working hard to bring this feature to you.</p>
                </div>
                <Button variant="outline" onClick={() => setActiveTab("overview")}>
                  Back to Dashboard
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
