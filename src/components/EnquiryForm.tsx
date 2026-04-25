import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, AlertCircle } from "lucide-react";
import { submitEnquiry } from "../services/dbService";

export default function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("enquiry-name"),
      email: formData.get("enquiry-email"),
      subject: formData.get("enquiry-subject"),
      message: formData.get("enquiry-message"),
    };

    try {
      await submitEnquiry(data);
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-lg text-gray-600">
            Submit an enquiry and our team will get back to you within 24 hours.
          </p>
        </div>

        <Card className="border-none shadow-xl overflow-hidden">
          <CardContent className="p-0 flex flex-col md:flex-row">
            <div className="bg-orange-600 p-10 text-white md:w-1/3">
              <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-orange-100 text-sm uppercase tracking-wider font-bold mb-1">Email</p>
                  <p className="font-medium">support@codex.com</p>
                </div>
                <div>
                  <p className="text-orange-100 text-sm uppercase tracking-wider font-bold mb-1">Phone</p>
                  <p className="font-medium">+91 87663 29759</p>
                </div>
                <div>
                  <p className="text-orange-100 text-sm uppercase tracking-wider font-bold mb-1">Office</p>
                  <p className="font-medium">Digital Academy Plaza, Mumbai, India</p>
                </div>
              </div>
            </div>

            <div className="p-10 md:w-2/3 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Enquiry form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="enquiry-name" className="text-sm font-semibold text-gray-700">Name</label>
                    <Input id="enquiry-name" name="enquiry-name" placeholder="Your Name" required className="rounded-xl" aria-required="true" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="enquiry-email" className="text-sm font-semibold text-gray-700">Email</label>
                    <Input id="enquiry-email" name="enquiry-email" type="email" placeholder="Your Email" required className="rounded-xl" aria-required="true" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="enquiry-subject" className="text-sm font-semibold text-gray-700">Subject</label>
                  <Input id="enquiry-subject" name="enquiry-subject" placeholder="What would you like to know?" required className="rounded-xl" aria-required="true" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="enquiry-message" className="text-sm font-semibold text-gray-700">Message</label>
                  <Textarea id="enquiry-message" name="enquiry-message" placeholder="Type your message here..." className="rounded-xl min-h-[120px]" required aria-required="true" />
                </div>
                <Button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-xl font-bold transition-all shadow-lg shadow-orange-200"
                  aria-busy={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Submit Enquiry"}
                  <Send className="ml-2 w-4 h-4" aria-hidden="true" />
                </Button>

                {status === "success" && (
                  <p className="text-green-600 text-center font-medium animate-in fade-in slide-in-from-top-2" role="alert">
                    Thank you! Your enquiry has been received.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-red-600 text-center font-medium flex items-center justify-center gap-2" role="alert">
                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
