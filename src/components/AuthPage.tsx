import { useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Lock, LogIn, UserPlus, AlertCircle, Chrome } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { createUserProfile, signInWithGoogle } from "../services/dbService";

export default function AuthPage({ onLogin, initialReferralCode }: { onLogin: () => void, initialReferralCode?: string | null }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: initialReferralCode || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await createUserProfile(user.uid, {
          name: formData.name,
          email: formData.email,
          referredBy: formData.referralCode || null
        });
      }
      onLogin();
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle(formData.referralCode);
      onLogin();
    } catch (err: any) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold text-2xl text-orange-600 mb-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white">C</div>
            <span>Codex Academy</span>
          </div>
          <p className="text-gray-500">Transform your future with digital mastery.</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </CardTitle>
                <CardDescription>
                  {isLogin 
                    ? "Enter your credentials to access your dashboard." 
                    : "Join Batch #8 and start your transformation."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-sm text-red-600 animate-in fade-in zoom-in-95">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <label htmlFor="auth-name" className="text-sm font-semibold text-gray-700">Full Name</label>
                      <Input 
                        id="auth-name" 
                        placeholder="John Doe" 
                        required 
                        className="rounded-xl"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label htmlFor="auth-email" className="text-sm font-semibold text-gray-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                      <Input 
                        id="auth-email" 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        className="pl-10 rounded-xl"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="auth-password" className="text-sm font-semibold text-gray-700">Password</label>
                      {isLogin && (
                        <button type="button" className="text-xs text-orange-600 hover:underline">Forgot password?</button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                      <Input 
                        id="auth-password" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        className="pl-10 rounded-xl"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <label htmlFor="auth-referral" className="text-sm font-semibold text-gray-700">Referral Code (Optional)</label>
                      <Input 
                        id="auth-referral" 
                        placeholder="Enter code if any" 
                        className="rounded-xl"
                        value={formData.referralCode}
                        onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
                      />
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-xl font-bold transition-all"
                    aria-busy={loading}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Processing..." />
                    ) : (
                      <span className="flex items-center gap-2">
                         {isLogin ? "Login to Dashboard" : "Register Now"}
                        {isLogin ? <LogIn className="w-4 h-4" aria-hidden="true" /> : <UserPlus className="w-4 h-4" aria-hidden="true" />}
                      </span>
                    )}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500 font-medium">Or continue with</span>
                    </div>
                  </div>

                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full border-gray-200 hover:bg-gray-50 text-gray-700 py-6 rounded-xl font-semibold transition-all group"
                  >
                    <Chrome className="w-5 h-5 mr-2 text-red-500 group-hover:scale-110 transition-transform" />
                    Sign in with Google
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    {isLogin 
                      ? "Don't have an account? Register here" 
                      : "Already have an account? Login here"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
