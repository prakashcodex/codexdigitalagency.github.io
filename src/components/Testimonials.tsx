import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Aryan Sharma",
    role: "Batch #4 Student",
    content: "The Codex program completely changed my outlook on education. In just 6 months, I've learned more practical skills than in 3 years of college.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan"
  },
  {
    name: "Priya Patel",
    role: "Batch #6 Student",
    content: "Mindset and communication modules were game-changers for me. I used to be terrified of public speaking, but now I lead student group discussions.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    name: "Rahul Verma",
    role: "Batch #5 Student",
    content: "The AI skills module is purely future-proof. Learning prompt engineering and automation has helped me start my own freelance gig.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            What Our Students Say
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from students who've transformed their lives with Codex Digital Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative pt-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-orange-50">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <CardContent className="text-center p-8">
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-orange-100 absolute top-12 left-6 -z-0" />
                  <p className="text-gray-700 italic mb-6 relative z-10">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-orange-600 font-medium">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
