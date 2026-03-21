import * as React from "react";
import { TestimonialsColumn, Testimonial } from "../ui/testimonials-columns-1";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials: Testimonial[] = [
  {
    text: "Dr. Joe performed my sinus surgery last month, and I can finally breathe clearly for the first time in years. His professionalism and skill are unmatched.",
    image: "https://picsum.photos/seed/patient1/100/100",
    name: "Sarah Jenkins",
    role: "Sinus Surgery Patient",
  },
  {
    text: "My son was very nervous about his tonsillectomy, but Dr. Henderson's bedside manner was incredible. He made us both feel at ease. Highly recommend for pediatric ENT.",
    image: "https://picsum.photos/seed/patient2/100/100",
    name: "Michael Thompson",
    role: "Parent of Pediatric Patient",
  },
  {
    text: "The clinic is modern, and the staff is very efficient. I had a chronic ear issue that other doctors couldn't solve, but Dr. Joe diagnosed it immediately.",
    image: "https://picsum.photos/seed/patient3/100/100",
    name: "Emily Rodriguez",
    role: "Chronic Ear Care Patient",
  },
  {
    text: "Excellent experience from start to finish. The booking process was fast, and the consultation was thorough. Dr. Henderson explained everything clearly.",
    image: "https://picsum.photos/seed/patient4/100/100",
    name: "David Wilson",
    role: "General ENT Consultation",
  },
  {
    text: "I've seen many specialists for my allergies, but the treatment plan Dr. Joe put together has been life-changing. I'm no longer reliant on daily meds.",
    image: "https://picsum.photos/seed/patient5/100/100",
    name: "Jessica Chen",
    role: "Allergy Management Patient",
  },
  {
    text: "A truly world-class surgeon. The results of my septoplasty exceeded my expectations. Minimal recovery time and amazing results.",
    image: "https://picsum.photos/seed/patient6/100/100",
    name: "Robert Taylor",
    role: "Septoplasty Patient",
  },
  {
    text: "Dr. Henderson is very knowledgeable and patient. He took the time to answer all my questions about my hearing loss options.",
    image: "https://picsum.photos/seed/patient7/100/100",
    name: "Margaret Evans",
    role: "Hearing Loss Patient",
  },
  {
    text: "The best ENT specialist in North Sydney. Professional, compassionate, and highly skilled. The clinic environment is very calming.",
    image: "https://picsum.photos/seed/patient8/100/100",
    name: "James Anderson",
    role: "Nasal Obstruction Patient",
  },
  {
    text: "Very impressed with the follow-up care. Dr. Joe personally checked in on my recovery after my procedure. That level of care is rare.",
    image: "https://picsum.photos/seed/patient9/100/100",
    name: "Linda White",
    role: "Post-Op Patient",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-surface-container-lowest py-24 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/50 border border-primary/10 text-primary font-semibold text-xs uppercase tracking-widest mb-6">
            <Star className="size-3 fill-primary" />
            Patient Testimonials
          </div>

          <h2 className="text-4xl sm:text-5xl font-headline font-extrabold text-primary tracking-tight mb-6">
            What Our Patients Say
          </h2>
          <p className="text-lg text-on-surface-variant font-body leading-relaxed">
            Discover why hundreds of patients trust Dr. Joe Henderson for their ear, nose, and throat health.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={30} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={28} />
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-primary font-headline font-bold text-xl">4.9/5 Average Patient Rating</p>
          <p className="text-on-surface-variant font-body text-sm">Based on over 500 verified patient reviews</p>
        </motion.div>
      </div>
    </section>
  );
}
