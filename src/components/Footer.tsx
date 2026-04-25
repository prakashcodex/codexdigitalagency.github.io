import { Instagram, Youtube, MessageSquare, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-orange-500">CODEX</span>
              <span className="text-2xl font-light text-white ml-1">ACADEMY</span>
            </div>
            <p className="text-gray-400 text-lg max-w-md mb-8">
              Transforming India's education landscape by providing future-proof skills 
              and practical knowledge to the next generation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Login / Register</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Classes</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Quiz</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">AI Buddy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2026 Codex Digital Academy — Future-Proof Your Career 🙏</p>
        </div>
      </div>
    </footer>
  );
}
