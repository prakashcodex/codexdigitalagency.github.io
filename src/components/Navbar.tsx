import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Modules", href: "#modules" },
    { name: "Why Us", href: "#why-us" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-orange-600">CODEX</span>
            <span className="text-2xl font-light text-gray-900 ml-1">ACADEMY</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <Button 
              variant="ghost" 
              className="text-orange-600 font-bold"
              onClick={() => (window as any).toggleAuth?.()}
            >
              Login
            </Button>
            <Button 
              onClick={() => (window as any).openRegister?.()}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6"
            >
              Join Batch #8 🚀
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" />}>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-medium text-gray-900 hover:text-orange-600"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button 
                    onClick={() => {
                      setIsOpen(false);
                      (window as any).openRegister?.();
                    }}
                    className="bg-orange-600 hover:bg-orange-700 text-white rounded-full w-full py-6 text-lg"
                  >
                    Join Batch #8 🚀
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      (window as any).toggleAuth?.();
                    }}
                    className="border-gray-200 text-gray-600 rounded-full w-full py-6 text-lg"
                  >
                    Login
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
