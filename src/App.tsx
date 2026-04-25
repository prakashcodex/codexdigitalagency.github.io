/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Comparison from "./components/Comparison";
import Testimonials from "./components/Testimonials";
import EnquiryForm from "./components/EnquiryForm";
import WhatsAppWidget from "./components/WhatsAppWidget";
import AIBuddy from "./components/AIBuddy";
import Footer from "./components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Ticket, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralMessage, setReferralMessage] = useState<{ text: string; type: "success" | "error" | null }>({ text: "", type: null });
  const [discount, setDiscount] = useState(0);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [urlReferralCode, setUrlReferralCode] = useState<string | null>(null);

  useEffect(() => {
    // Check for referral code in URL
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setUrlReferralCode(ref);
      setShowAuth(true); // Open auth form if referral link is used
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Expose toggle to window for Navbar access
  if (typeof window !== 'undefined') {
    (window as any).toggleAuth = () => setShowAuth(true);
    (window as any).openRegister = () => setIsRegisterOpen(true);
  }

  const validCodes: Record<string, number> = {
    'SAVE10': 10,
    'WELCOME20': 20,
    'CODEX50': 50
  };

  const validateReferral = () => {
    const code = referralCode.toUpperCase().trim();
    if (!code) {
      setReferralMessage({ text: "", type: null });
      setDiscount(0);
      return;
    }

    if (validCodes[code]) {
      const pct = validCodes[code];
      setReferralMessage({ text: `Success! ${pct}% discount applied.`, type: "success" });
      setDiscount(pct);
    } else {
      setReferralMessage({ text: "Invalid referral code. Please try again.", type: "error" });
      setDiscount(0);
    }
  };

  const basePrice = 12000;
  const finalPrice = basePrice - (basePrice * discount / 100);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  if (showAuth) {
    return <AuthPage 
      initialReferralCode={urlReferralCode}
      onLogin={() => {
        setIsAuthenticated(true);
        setShowAuth(false);
      }} 
    />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      
      <main>
        <Hero />
        
        <Features />
        
        <Comparison />

        <Testimonials />

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Invest in Your Future Today
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                One simple plan for a complete 1-year transformation.
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              <Card className="border-2 border-orange-500 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0">
                  <Badge className="bg-orange-600 text-white rounded-none rounded-bl-lg px-4 py-1">Best Value</Badge>
                </div>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold">1-Year Transformation Program</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-extrabold tracking-tight">₹12,000</span>
                    <span className="text-gray-500 font-medium">/ year</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4 mb-8">
                    {[
                      "100% LIVE Interactive Classes",
                      "52-Week Structured Curriculum",
                      "Income Generation System",
                      "Complete Personality Transformation",
                      "Future-Proof AI & Digital Skills",
                      "Parent Transparency Dashboard",
                      "Lifetime Access to Community",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setIsRegisterOpen(true)}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg rounded-xl shadow-lg shadow-orange-200"
                    >
                      Register for Batch #8 🚀
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowAuth(true)}
                      className="w-full border-gray-200 text-gray-600 py-6 text-lg rounded-xl hover:bg-gray-50"
                    >
                      <LogIn className="w-5 h-5 mr-2" /> Already a Member? Login
                    </Button>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Only 7 seats left for the current batch!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">Who is this program for?</AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base">
                  This program is designed for students (and their parents) who want to break free from the traditional, 
                  outdated education system and learn skills that are actually in demand in the modern, AI-driven world.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">Are the classes really live?</AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base">
                  Yes! 100% of our core curriculum is delivered via LIVE interactive classes where you can ask questions 
                  and get real-time feedback from mentors.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">What is the "Income Generation System"?</AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base">
                  We don't just teach skills; we teach you how to monetize them. We explain various digital income streams 
                  and help you build a system to start earning while you learn.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">Is there any age limit?</AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base">
                  While we primarily focus on students aged 15-25, anyone with a hunger to learn and transform their 
                  future is welcome to join.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <EnquiryForm />

        {/* Final CTA */}
        <section className="py-20 bg-orange-600 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Future Self Will Thank You.</h2>
            <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
              Or regret that you didn't act today. Join the digital revolution with Codex Academy.
            </p>
            <Button 
              onClick={() => setIsRegisterOpen(true)}
              className="bg-white text-orange-600 hover:bg-orange-50 text-xl py-8 px-12 rounded-full font-bold shadow-2xl"
            >
              Start Your Transformation Now 🚀
            </Button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>

      {/* No longer using registration sheet, using unified AuthPage */}
      
      <Footer />
      
      <AIBuddy />

      <WhatsAppWidget />
    </div>
  );
}

