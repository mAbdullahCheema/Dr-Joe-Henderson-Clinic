import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

export function Navbar({ 
  onBookClick, 
  onLogoClick,
  isBookingPage = false
}: { 
  onBookClick: () => void; 
  onLogoClick: () => void;
  isBookingPage?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(247, 249, 251, 0)", "rgba(247, 249, 251, 0.9)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(12px)"]
  );

  const borderOpacity = useTransform(
    scrollY,
    [0, 50],
    ["rgba(194, 199, 209, 0)", "rgba(194, 199, 209, 0.2)"]
  );

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Patient Experience", href: "#patient-experience" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Location", href: "#location" },
  ];

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (isBookingPage) {
      onLogoClick(); // This will take us back to landing page
      // Use setTimeout to ensure the target element exists before scrolling
      setTimeout(() => {
        const id = href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 600); // Wait for transition out + mounting
    } else {
      const id = href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      style={{ backgroundColor, backdropBlur, borderBottom: `1px solid ${borderOpacity}` }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button 
            onClick={onLogoClick}
            className="flex-shrink-0 flex items-center gap-2 text-left hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-headline font-bold text-xl">H</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-headline font-bold text-lg leading-tight tracking-tight">
                Henderson ENT & Sinus Centre
              </span>
              <span className="text-on-secondary-container font-body text-xs font-medium uppercase tracking-widest">
                Dr. Joe Henderson
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="text-on-surface-variant hover:text-primary font-bold text-sm transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <div className="h-6 w-px bg-outline-variant/30 mx-2" />
            <a
              href="tel:+61290000000"
              className="flex items-center gap-2 text-primary font-semibold text-sm hover:opacity-80 transition-opacity"
            >
              <Phone className="size-4" />
              (02) 9000 0000
            </a>
            <Button className="shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-transform font-bold" onClick={onBookClick}>
              <Calendar className="size-4 mr-2" />
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-on-surface-variant hover:text-primary p-2 transition-colors"
            >
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-surface-container-lowest border-b border-outline-variant/20"
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="w-full text-left block px-3 py-4 text-base font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-xl transition-all"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 flex flex-col gap-4">
            <a
              href="tel:+61290000000"
              className="flex items-center justify-center gap-2 text-primary font-semibold py-3 border border-outline-variant/30 rounded-xl"
            >
              <Phone className="size-4" />
              (02) 9000 0000
            </a>
            <Button className="w-full h-12" onClick={onBookClick}>
              <Calendar className="size-4 mr-2" />
              Book Online
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

