import { motion } from "motion/react";
import { Check, Info, Calendar, Phone } from "lucide-react";
import { Button } from "../ui/Button";

const pricingPlans = [
  {
    title: "Initial Consultation",
    price: "$280",
    description: "Comprehensive first visit assessment and diagnostic plan.",
    features: [
      "Full ENT History Review",
      "Physical Examination",
      "Endoscopic Assessment (if required)",
      "Diagnostic Plan Development",
      "GP Referral Processing",
    ],
    cta: "Book Consultation",
    highlight: false,
  },
  {
    title: "Follow-up Visit",
    price: "$160",
    description: "Review of results and ongoing treatment monitoring.",
    features: [
      "Test Result Discussion",
      "Treatment Progress Review",
      "Prescription Management",
      "Surgical Planning (if needed)",
      "Ongoing Care Coordination",
    ],
    cta: "Schedule Follow-up",
    highlight: true,
  },
];

export function Pricing({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section id="pricing" className="py-24 bg-surface-container-lowest relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
              Transparent Pricing
            </h2>
            <h3 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-6">
              Invest in Your <br />
              <span className="text-on-secondary-container">Health & Wellness.</span>
            </h3>
            <p className="text-lg text-on-surface-variant font-body mb-10">
              We provide clear, upfront pricing for all consultations. Medicare rebates are available for most services with a valid GP referral.
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container/30 text-primary font-semibold text-sm">
              <Info className="size-4" />
              Medicare Rebates Apply to All Consultations
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-10 rounded-[2.5rem] border ${
                plan.highlight
                  ? "bg-primary text-white border-primary shadow-2xl shadow-primary/20"
                  : "bg-surface border-outline-variant/10 shadow-xl shadow-primary/5"
              } relative flex flex-col`}
            >
              {plan.highlight && (
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                  Most Common
                </div>
              )}
              
              <h4 className={`text-xl font-headline font-bold mb-2 ${plan.highlight ? "text-white" : "text-primary"}`}>
                {plan.title}
              </h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-5xl font-headline font-extrabold ${plan.highlight ? "text-white" : "text-primary"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm font-medium ${plan.highlight ? "text-white/70" : "text-on-surface-variant"}`}>
                  / visit
                </span>
              </div>
              
              <p className={`text-sm font-body mb-8 leading-relaxed ${plan.highlight ? "text-white/80" : "text-on-surface-variant"}`}>
                {plan.description}
              </p>
              
              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? "bg-white/20" : "bg-primary/10"}`}>
                      <Check className={`size-3 ${plan.highlight ? "text-white" : "text-primary"}`} />
                    </div>
                    <span className={`text-sm font-medium ${plan.highlight ? "text-white/90" : "text-on-surface-variant"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button
                variant={plan.highlight ? "secondary" : "default"}
                size="lg"
                className="w-full"
                onClick={onBookClick}
              >
                <Calendar className="size-4 mr-2" />
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-sm text-on-surface-variant font-body mb-8 leading-relaxed italic">
            * Please note that the fees listed above represent the standard initial consultation rates. Final out-of-pocket costs will be calculated following your appointment, taking into account Medicare rebates, private health insurance coverage, and any additional diagnostic procedures performed during the visit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-outline-variant/10 pt-8">
            <a
              href="tel:+61290000000"
              className="flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity"
            >
              <Phone className="size-4" />
              Call (02) 9000 0000
            </a>
            <span className="hidden sm:block text-outline-variant">|</span>
            <a
              href="mailto:info@drjoehenderson.com.au"
              className="text-primary font-bold hover:opacity-80 transition-opacity"
            >
              info@drjoehenderson.com.au
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
