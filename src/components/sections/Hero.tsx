import * as React from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Calendar, ArrowRight, Star, ShieldCheck, Clock, X, GraduationCap, Award, History, Heart } from "lucide-react";
import { Button } from "../ui/Button";

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export function Hero({ onBookClick }: { onBookClick: () => void }) {
  const [isAboutModalOpen, setIsAboutModalOpen] = React.useState(false);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/50 border border-primary/10 text-primary font-semibold text-xs uppercase tracking-widest mb-6">
              <Star className="size-3 fill-primary" />
              Henderson ENT & Sinus Centre
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-primary leading-[1.1] tracking-tight mb-6">
              Expert Care by <br />
              <span className="text-on-secondary-container bg-secondary-container/30 px-2 rounded-lg">Dr. Joe Henderson</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-on-surface-variant font-body leading-relaxed mb-10 max-w-xl">
              Welcome to <span className="font-bold text-primary">Henderson ENT & Sinus Centre</span>. Dr. Joe Henderson provides specialized surgical and medical treatment for adults and children, focusing on precision, comfort, and long-term wellness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="shadow-xl shadow-primary/20 group" onClick={onBookClick}>
                Book Your Consultation
                <ArrowRight className="size-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => setIsAboutModalOpen(true)}>
                About Me
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-outline-variant/20 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <ShieldCheck className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">Board Certified</p>
                  <p className="text-xs text-on-surface-variant">FRACS Specialist</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <Clock className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">Fast Booking</p>
                  <p className="text-xs text-on-surface-variant">Appointments within 48h</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative perspective-1000 lg:-mt-20"
          >
            <TiltCard>
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 border-8 border-surface-container-lowest bg-surface-container-highest">
                <img
                  src="/1754014946124-faf97f32-95cb-4c5c-be3b-4a1ee15b3ef6.jpeg"
                  alt="Dr. Joe Henderson"
                  className="w-full h-auto object-cover aspect-square"
                  referrerPolicy="no-referrer"
                  style={{ transform: "translateZ(50px)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
            </TiltCard>

            {/* Floating Card - Now below the 3D card */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              onClick={() => {
                const testimonialsSection = document.getElementById('testimonials');
                if (testimonialsSection) {
                  testimonialsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-8 bg-surface-container-lowest/90 backdrop-blur-md p-6 rounded-3xl border border-outline-variant/10 shadow-xl max-w-sm mx-auto lg:mx-0 cursor-pointer hover:scale-105 transition-transform text-left w-full"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`}
                      className="w-10 h-10 rounded-full border-2 border-surface-container-lowest object-cover"
                      alt="Patient"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">500+ Happy Patients</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-on-surface-variant ml-1">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </motion.button>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-container rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          </motion.div>
        </div>
      </div>

      {/* About Me Modal */}
      <AnimatePresence>
        {isAboutModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-[2.5rem] shadow-2xl border border-outline-variant/10 overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-white transition-all"
              >
                <X className="size-6" />
              </button>

              <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
                {/* Modal Hero */}
                <div className="relative h-64 sm:h-80 bg-primary overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 bg-gradient-to-t from-primary to-transparent">
                    <h2 className="text-3xl sm:text-5xl font-headline font-extrabold text-white mb-2">
                      Dr. Joe Henderson
                    </h2>
                    <p className="text-white/80 font-body text-lg">
                      MBBS, FRACS (OHNS) | Senior ENT Surgeon
                    </p>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 sm:p-12 space-y-12">
                  <div className="grid sm:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-primary">
                        <History className="size-6" />
                        <h3 className="text-2xl font-headline font-bold">The Medical Journey</h3>
                      </div>
                      <p className="text-on-surface-variant font-body leading-relaxed">
                        With over 20 years of clinical experience, Dr. Joe Henderson has dedicated his career to advancing the field of Otolaryngology. His journey began at the University of Sydney, where he graduated with honors, followed by intensive surgical training at major metropolitan hospitals.
                      </p>
                      <p className="text-on-surface-variant font-body leading-relaxed">
                        He has performed thousands of successful procedures, specializing in complex sinus surgeries and pediatric ENT care. His approach combines cutting-edge technology with a deeply personal commitment to patient well-being.
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                          <GraduationCap className="size-6" />
                          <h3 className="text-xl font-headline font-bold">Education & Training</h3>
                        </div>
                        <ul className="space-y-3 text-on-surface-variant font-body text-sm">
                          <li className="flex gap-3">
                            <span className="text-primary font-bold">•</span>
                            <span>Fellow of the Royal Australasian College of Surgeons (FRACS)</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-primary font-bold">•</span>
                            <span>Bachelor of Medicine, Bachelor of Surgery (MBBS), USYD</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-primary font-bold">•</span>
                            <span>Advanced Fellowship in Rhinology & Skull Base Surgery</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                          <Award className="size-6" />
                          <h3 className="text-xl font-headline font-bold">Professional Affiliations</h3>
                        </div>
                        <ul className="space-y-3 text-on-surface-variant font-body text-sm">
                          <li className="flex gap-3">
                            <span className="text-primary font-bold">•</span>
                            <span>Australian Society of Otolaryngology Head & Neck Surgery</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-primary font-bold">•</span>
                            <span>Royal Australasian College of Surgeons</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-outline-variant/10">
                    <div className="flex items-center gap-3 text-primary mb-6">
                      <Heart className="size-6" />
                      <h3 className="text-2xl font-headline font-bold">Philosophy of Care</h3>
                    </div>
                    <blockquote className="text-xl font-body italic text-on-surface-variant border-l-4 border-primary pl-6 py-2">
                      "I believe that every patient deserves a treatment plan as unique as their own story. My goal is not just to treat symptoms, but to restore quality of life through precision, empathy, and excellence."
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
