import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, BookOpen, Trophy, Clock, ChevronRight, Share2, Copy, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface CourseProgress {
  id: string;
  name: string;
  progress: number;
  lastAccessed: string;
  status: "In Progress" | "Completed";
}

interface UserProfileProps {
  userData: {
    uid: string;
    name: string;
    email: string;
    referralCode?: string;
    referralCount?: number;
    referralRewards?: number;
    createdAt?: any;
  } | null;
}

export default function UserProfile({ userData }: UserProfileProps) {
  const [copied, setCopied] = useState(false);
  const courses: CourseProgress[] = [
    { id: "1", name: "Mindset Development", progress: 100, lastAccessed: "2 days ago", status: "Completed" },
    { id: "2", name: "AI Skills Mastery", progress: 45, lastAccessed: "1 hour ago", status: "In Progress" },
    { id: "3", name: "Digital Communication", progress: 12, lastAccessed: "5 days ago", status: "In Progress" },
  ];

  if (!userData) return <div className="p-8 text-center">Loading profile...</div>;

  const joinedDate = userData.createdAt?.toDate?.() ? userData.createdAt.toDate().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : "Recently";
  const referralLink = `${window.location.origin}?ref=${userData.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
      >
        <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
          <User className="w-12 h-12" />
        </div>
        <div className="text-center md:text-left space-y-2 flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Joined {joinedDate}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" className="rounded-full px-6">Edit Profile</Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Stats */}
        <Card className="border-none shadow-sm bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Enrolled</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{courses.length} Courses</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">Completed</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              {courses.filter(c => c.status === "Completed").length} Modules
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Share2 className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Referrals</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {userData.referralCount || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-900">Rewards</span>
            </div>
            <div className="text-2xl font-bold text-orange-900">₹{userData.referralRewards || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Section */}
      <Card className="border-orange-100 bg-orange-100/10 overflow-hidden rounded-3xl">
        <CardContent className="p-0">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="space-y-4 text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Refer & Earn Rewards</h2>
              <p className="text-gray-600">Share your referral link with friends. When they join, you both earn ₹500 discount on premium courses.</p>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono text-gray-500 truncate flex items-center">
                  {referralLink}
                </div>
                <Button 
                  onClick={copyToClipboard}
                  className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 flex items-center gap-2 h-12 shrink-0"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </div>
            </div>
            <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl shadow-xl border border-orange-100 transform rotate-3">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Code</p>
                <p className="text-2xl font-black text-orange-600 tracking-wider">{userData.referralCode}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course History */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Course Progress</h2>
        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="border-gray-100 hover:border-orange-200 transition-colors group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-gray-900">{course.name}</h3>
                      <Badge variant={course.status === "Completed" ? "default" : "secondary"} className={course.status === "Completed" ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                        {course.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">Last accessed {course.lastAccessed}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 transition-all duration-500" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-8">{course.progress}%</span>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
