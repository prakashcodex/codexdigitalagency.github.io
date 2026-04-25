import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { getChatResponse } from "../services/geminiService";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function AIBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hi! I'm Codex AI Buddy. Ask me anything about our 1-year transformation program!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await getChatResponse(userMessage, history);
      setMessages(prev => [...prev, { role: "model", text: response }]);
    } catch (error) {
      console.error("AI Buddy Error:", error);
      setMessages(prev => [...prev, { role: "model", text: "Sorry, I'm having a bit of trouble connecting. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4"
          >
            <Card className="w-[350px] sm:w-[400px] h-[500px] shadow-2xl border-orange-100 flex flex-col overflow-hidden">
              <CardHeader className="bg-orange-600 text-white p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6" aria-hidden="true" />
                  <CardTitle className="text-lg">Codex AI Buddy</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)} 
                  className="text-white hover:bg-orange-700"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-4 overflow-hidden">
                <ScrollArea className="h-full pr-4" viewportRef={scrollRef} role="log" aria-live="polite">
                  <div className="flex flex-col gap-4">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                            msg.role === "user"
                              ? "bg-orange-600 text-white rounded-tr-none"
                              : "bg-gray-100 text-gray-800 rounded-tl-none"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1 opacity-70">
                            {msg.role === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              {msg.role === "user" ? "You" : "AI Buddy"}
                            </span>
                          </div>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none animate-pulse text-gray-400 text-sm">
                          AI Buddy is thinking...
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex w-full gap-2"
                >
                  <Input
                    placeholder="Ask about the program..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 rounded-full border-gray-200 focus:ring-orange-500"
                    aria-label="Chat message"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="rounded-full bg-orange-600 hover:bg-orange-700 shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Buddy chat" : "Open AI Buddy chat"}
        aria-expanded={isOpen}
        className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-gray-900 rotate-90" : "bg-orange-600 hover:bg-orange-700"
        }`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
      </Button>
    </div>
  );
}
