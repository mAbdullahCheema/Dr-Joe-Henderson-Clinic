/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Journey } from "./components/sections/Journey";
import { Pricing } from "./components/sections/Pricing";
import { Testimonials } from "./components/sections/Testimonials";
import { Location } from "./components/sections/Location";
import { Footer } from "./components/layout/Footer";
import { BookingForm } from "./components/booking/BookingForm";
import { X } from "lucide-react";

export default function App() {
  const [showBooking, setShowBooking] = React.useState(false);

  const toggleBooking = () => {
    setShowBooking(!showBooking);
    if (!showBooking) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    setShowBooking(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10 selection:text-primary scroll-smooth">
      <Navbar 
        onBookClick={toggleBooking} 
        onLogoClick={handleLogoClick}
        isBookingPage={showBooking} 
      />
      
      <main>
        <AnimatePresence mode="wait">
          {!showBooking ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onBookClick={toggleBooking} />
              <Services />
              <Journey />
              <Pricing onBookClick={toggleBooking} />
              <Testimonials />
              <Location />
            </motion.div>
          ) : (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h1 className="text-4xl font-headline font-extrabold text-primary mb-2">
                    Online Booking
                  </h1>
                  <p className="text-on-surface-variant font-body">
                    Secure your appointment in less than 2 minutes.
                  </p>
                </div>
                <button
                  onClick={toggleBooking}
                  className="p-3 rounded-full bg-surface-container-low hover:bg-surface-container-high transition-colors group"
                >
                  <X className="size-6 text-on-surface-variant group-hover:text-primary" />
                </button>
              </div>
              
              <BookingForm onClose={toggleBooking} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
