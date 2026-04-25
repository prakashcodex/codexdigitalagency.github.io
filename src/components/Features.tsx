import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, MessageSquare, Laptop, Cpu, PenTool, User, Wallet } from "lucide-react";
import { motion } from "motion/react";

const modules = [
  {
    title: "Mindset Development",
    description: "Build the foundation for success with a growth mindset and winning habits.",
    icon: Brain,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "English Communication",
    description: "Master the global language of business and technology with confidence.",
    icon: MessageSquare,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Digital Skills",
    description: "Learn essential digital tools and platforms used in the modern workplace.",
    icon: Laptop,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "AI Skills",
    description: "Future-proof your career by mastering Generative AI and prompt engineering.",
    icon: Cpu,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Content Creation",
    description: "Learn to build your personal brand and create high-impact digital content.",
    icon: PenTool,
    color: "bg-pink-50 text-pink-600",
  },
  {
    title: "Personality Development",
    description: "Transform your public speaking, body language, and leadership skills.",
    icon: User,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Finance & Time Management",
    description: "Master your money and your most valuable asset—your time.",
    icon: Wallet,
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function Features() {
  return (
    <section id="modules" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            7 Transformative Modules — 1 Year of Mastery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive curriculum is designed to transform you from a student to a high-value professional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${module.color} flex items-center justify-center mb-4`}>
                    <module.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {module.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
