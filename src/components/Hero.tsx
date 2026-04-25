import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-orange-600 uppercase bg-orange-50 rounded-full">
              Batch #8 Registration Open
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
              Stop Wasting Years in a <br />
              <span className="text-orange-600">Broken Education System</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
              India's education system is failing. Join Codex Digital Academy for a 100% LIVE interactive 
              transformation program. Learn future-proof AI & digital skills.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg py-7 px-10 rounded-full shadow-lg shadow-orange-200 transition-all hover:scale-105">
                Join Codex Academy 🚀
              </Button>
              <Button variant="outline" className="text-lg py-7 px-10 rounded-full border-2 hover:bg-gray-50 transition-all">
                🔑 Already a Member? Login
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-gray-500 font-medium">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-900">100%</span>
                <span className="text-sm">Live Classes</span>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-900">52</span>
                <span className="text-sm">Weeks Program</span>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-900">7+</span>
                <span className="text-sm">Modules</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
