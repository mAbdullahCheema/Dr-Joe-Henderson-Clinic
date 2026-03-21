import { motion } from "motion/react";
import { Ear, Wind, Activity, Mic2, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

const services = [
  {
    title: "Ear Conditions",
    description: "Comprehensive care for hearing loss, tinnitus, ear infections, and balance disorders.",
    icon: Ear,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Nose & Sinus",
    description: "Advanced treatment for chronic sinusitis, allergies, nasal obstruction, and snoring.",
    icon: Wind,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Throat & Voice",
    description: "Specialized care for swallowing disorders, tonsillitis, and voice changes.",
    icon: Mic2,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Paediatric ENT",
    description: "Gentle, expert care for children's ear, nose, and throat health issues.",
    icon: ShieldCheck,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Surgical Solutions",
    description: "Minimally invasive surgical procedures for long-term relief and recovery.",
    icon: Activity,
    color: "bg-red-500/10 text-red-600",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-surface-container-lowest relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
              Our Expertise
            </h2>
            <h3 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-6">
              Specialized Care for <br />
              <span className="text-on-secondary-container">Every Patient.</span>
            </h3>
            <p className="text-lg text-on-surface-variant font-body">
              We offer a full spectrum of ENT services, combining clinical excellence with a compassionate, patient-centered approach.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-[2rem] bg-surface border border-outline-variant/10 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", service.color)}>
                <service.icon className="size-7" />
              </div>
              <h4 className="text-xl font-headline font-bold text-primary mb-4">
                {service.title}
              </h4>
              <p className="text-on-surface-variant font-body leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
          
          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-8 rounded-[2rem] bg-primary text-white flex flex-col justify-center items-center text-center shadow-xl shadow-primary/20"
          >
            <h4 className="text-2xl font-headline font-bold mb-4">
              Need Urgent Care?
            </h4>
            <p className="text-white/80 font-body mb-8">
              We offer priority appointments for acute conditions.
            </p>
            <button className="w-full py-4 bg-white text-primary rounded-2xl font-bold hover:bg-secondary-container transition-colors">
              Call (02) 9000 0000
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
