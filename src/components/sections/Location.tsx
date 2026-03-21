import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export function Location() {
  return (
    <section id="location" className="py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
              Find Us
            </h2>
            <h3 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-8">
              North Sydney <br />
              <span className="text-on-secondary-container">Specialist Suite.</span>
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <MapPin className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-headline font-bold text-primary mb-1">Address</p>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    Suite 402, Level 4 <br />
                    123 Walker Street <br />
                    North Sydney NSW 2060
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=123+Walker+Street+North+Sydney+NSW+2060"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary font-bold text-sm mt-2 hover:underline"
                  >
                    Get Directions
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Phone className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-headline font-bold text-primary mb-1">Contact</p>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    Phone: (02) 9000 0000 <br />
                    Fax: (02) 9000 0001 <br />
                    Email: info@drjoehenderson.com.au
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Clock className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-headline font-bold text-primary mb-1">Hours</p>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    Monday – Friday: 8:30am – 5:00pm <br />
                    Saturday – Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-surface-container-lowest shadow-2xl shadow-primary/10">
              {/* Interactive Google Maps Embed */}
              <iframe
                title="Dr. Joe Henderson's Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.8!2d151.2073!3d-33.8389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDUwJzIwLjAiUyAxNTHCsDEyJzI2LjMiRQ!5e0!3m2!1sen!2sau!4v1!5m2!1sen!2sau&q=123+Walker+Street,+North+Sydney+NSW+2060"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
