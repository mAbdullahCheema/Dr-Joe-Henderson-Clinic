import { motion } from "motion/react";
import { ClipboardList, Stethoscope, FileText, CalendarCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "A comprehensive assessment of your symptoms and medical history with Dr. Henderson.",
    icon: ClipboardList,
    time: "30-45 mins",
    color: "bg-blue-500/5 text-blue-600",
  },
  {
    number: "02",
    title: "Specialized Testing",
    description: "In-clinic diagnostic tests including audiology, endoscopy, or imaging as required.",
    icon: Stethoscope,
    time: "As needed",
    color: "bg-emerald-500/5 text-emerald-600",
  },
  {
    number: "03",
    title: "Treatment Plan",
    description: "A personalized medical or surgical strategy tailored to your specific needs and goals.",
    icon: FileText,
    time: "Same day",
    color: "bg-purple-500/5 text-purple-600",
  },
  {
    number: "04",
    title: "Ongoing Support",
    description: "Post-treatment follow-ups and long-term wellness monitoring for lasting results.",
    icon: CalendarCheck,
    time: "Continuous",
    color: "bg-orange-500/5 text-orange-600",
  },
];

export function Journey() {
  return (
    <section id="patient-experience" className="py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
              Patient Experience
            </h2>
            <h3 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-6">
              Patient <br />
              <span className="text-on-secondary-container">Experience.</span>
            </h3>
            <p className="text-lg text-on-surface-variant font-body leading-relaxed">
              We believe in transparency and clarity. Here's what you can expect from your first visit through to your recovery.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-outline-variant/10 hidden lg:block -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative z-10 group"
            >
              <div className="p-8 rounded-[2.5rem] bg-surface-container-lowest border border-outline-variant/10 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${step.color}`}>
                    <step.icon className="size-7" />
                  </div>
                  <span className="text-4xl font-headline font-black text-primary/20 group-hover:text-primary/40 transition-colors">
                    {step.number}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container/30 text-primary text-[10px] font-bold uppercase tracking-widest">
                      {step.time}
                    </span>
                  </div>
                  <h4 className="text-xl font-headline font-bold text-primary mb-4">
                    {step.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="mt-8 lg:hidden flex justify-center">
                    <ArrowRight className="size-5 text-outline-variant/30 rotate-90" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 p-8 rounded-[2rem] bg-surface-container-low border border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-lg">!</span>
            </div>
            <div>
              <p className="text-sm font-bold text-primary mb-1">Pro Tip for New Patients</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Please bring your GP referral and any recent imaging results to your first appointment to expedite your care.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
