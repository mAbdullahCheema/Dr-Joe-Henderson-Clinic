import * as React from "react";
import { motion } from "motion/react";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { LegalModal } from "../ui/LegalModal";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = React.useState<"privacy" | "terms" | null>(null);

  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isJoined, setIsJoined] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const payload = {
        type: "newsletter_signup",
        email: email,
        submittedAt: new Date().toISOString(),
        clinic: "Dr. Joe Henderson ENT Specialist",
      };

      const response = await fetch("https://abdullahtestingdo22.app.n8n.cloud/webhook/04a17dd9-75c3-4e78-a58a-a110be55c51e", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsJoined(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-white pt-20 pb-10 overflow-hidden relative">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-primary font-headline font-bold text-xl">H</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-headline font-bold text-lg leading-tight tracking-tight">
                  Henderson ENT & Sinus Centre
                </span>
                <span className="text-white/60 font-body text-xs font-medium uppercase tracking-widest">
                  Dr. Joe Henderson
                </span>
              </div>
            </div>
            <p className="text-white/70 font-body leading-relaxed max-w-xs">
              Providing world-class ear, nose, and throat care for the North Sydney community with precision and compassion.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: "Services", href: "#services" },
                { name: "Patient Experience", href: "#patient-experience" },
                { name: "Pricing", href: "#pricing" },
                { name: "Testimonials", href: "#testimonials" },
                { name: "Location", href: "#location" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/70 hover:text-white transition-colors font-body text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="size-5 text-white/60 mt-0.5" />
                <span className="text-white/70 font-body text-sm">
                  Suite 402, 123 Walker St <br />
                  North Sydney NSW 2060
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 text-white/60" />
                <span className="text-white/70 font-body text-sm">(02) 9000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-white/60" />
                <span className="text-white/70 font-body text-sm">info@drjoehenderson.com.au</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-6">Patient Newsletter</h4>
            {isJoined ? (
              <p className="text-emerald-400 font-bold text-sm">Welcome aboard! Check your inbox soon.</p>
            ) : (
              <>
                <p className="text-white/70 font-body text-sm mb-6 leading-relaxed">
                  Stay informed about clinic updates and ENT health tips.
                </p>
                <form className="relative" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  />
                  <button 
                    disabled={isSubmitting}
                    className="absolute right-1.5 top-1.5 h-9 px-4 bg-white text-primary rounded-lg font-bold text-xs hover:bg-secondary-container transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "..." : "Join"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/50 font-body text-xs">
            © {currentYear} Dr. Joe Henderson ENT Specialist. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveModal("privacy")}
              className="text-white/50 hover:text-white transition-colors font-body text-xs"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModal("terms")}
              className="text-white/50 hover:text-white transition-colors font-body text-xs"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        type={activeModal || "privacy"}
      />
    </footer>
  );
}
